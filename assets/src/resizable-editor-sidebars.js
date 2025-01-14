(() => {

    /**
     * Animates the inline `width` of an element from `start` to `end`.
     *
     * @param {HTMLElement} element - The element whose width needs to be changed.
     * @param {number} start - The starting width in pixels.
     * @param {number} end - The ending width in pixels.
     * @param {number} duration - The duration of the animation in milliseconds.
     */
    const animateWidth = (element, start, end, duration = 180) => {
        const stepTime = 16; // Roughly 60 frames per second
        const steps = Math.ceil(duration / stepTime);
        const stepSize = (end - start) / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const currentWidth = start + stepSize * currentStep;
            element.style.width = `${currentWidth}px`;

            if (currentStep >= steps) {
                element.style.width = `${end}px`;
                clearInterval(interval);
            }
        }, stepTime);
    }

    const sidebars = {
        right: {
            selector: '.interface-interface-skeleton__sidebar',
            el: null,
            interval: null,
            callbacks: {
                open: (sidebar, initial) => {
                    const savedWidth = localStorage.getItem(`rse_right_sidebar_width`) || sidebar.default;
                    if (initial) {
                        sidebar.el.style.width = `${savedWidth}px`;
                        return;
                    }

                    animateWidth(sidebar.el, 0, parseInt(savedWidth, 10));
                },
                close: (sidebar) => {
                    animateWidth(sidebar.el, sidebar.el.offsetWidth, 0)
                },
            },
            resizable: {
                handles: 'w',
                start: null,
                stop: null,
                resize: (sidebar) => (event, ui) => {
                    sidebar.el.style.left = 0;
                    localStorage.setItem(`rse_right_sidebar_width`, sidebar.el.offsetWidth);
                }
            },
            toggleSelectors: ['button[aria-controls="edit-post:document"]', 'button[aria-controls="edit-post:block"]'],
            default: 280
        },
        left: {
            selector: '.interface-interface-skeleton__secondary-sidebar',
            el: null,
            interval: null,
            callbacks: {
                open: (sidebar, initial) => {
                    const savedWidth = localStorage.getItem(`rse_${sidebar.side}_sidebar_width`) || sidebar.default;
                    const setSavedWidth = () => {
                        const weirdo = sidebar.el.querySelector(':scope > div > div[aria-hidden="true"]'); // I don't even know what this element is.
                        console.debug(weirdo, savedWidth);
                        initial
                            ? weirdo.style.width = `${savedWidth}px`
                            : animateWidth(weirdo, 0, parseInt(savedWidth, 10));
                    };
                    if (document.body.contains(sidebar.el)) {
                        setSavedWidth();
                        return;
                    }
                    sidebar.interval = setInterval(function () {
                        sidebar.el = document.querySelector(sidebar.selector);
                        if (!sidebar.el) {
                            return;
                        }
                        clearInterval(sidebar.interval);

                        setSavedWidth();

                        // These are new sidebar elements, and we have to re-initialize the jQuery UI Resizable
                        jQuery(sidebar.el).resizable({
                            handles: sidebar.resizable.handles,
                            start: sidebar.resizable.start?.call(null, sidebar),
                            stop: sidebar.resizable.stop?.call(null, sidebar),
                            resize: sidebar.resizable.resize.call(null, sidebar),
                        });
                    }, 100);
                },
                close: (sidebar) => {
                }
            },
            resizable: {
                handles: 'e',
                start: null,
                stop: null,
                resize: (sidebar) => (event, ui) => {
                    sidebar.el.style.right = 0;
                    localStorage.setItem(`rse_${sidebar.side}_sidebar_width`, sidebar.el.offsetWidth);
                }
            },
            toggleSelectors: ['.editor-document-tools__document-overview-toggle', '.editor-document-tools__inserter-toggle'],
            default: 350
        }
    };

    /**
     * Determines whether the sidebar should be open or closed based on the state
     * of certain DOM elements defined by their selectors.
     *
     * This function checks if any of the elements corresponding to the provided
     * selectors have the class `is-pressed`. If at least one element has this
     * class, it triggers the `open` callback for the specified sidebar. Otherwise,
     * it triggers the `close` callback for the sidebar.
     *
     * @param {string[]} selectors - An array of CSS selectors used to identify the relevant DOM elements.
     * @param {string} side - The identifier for the sidebar, typically used as a key in the `sidebars` object.
     * @param {boolean} [initial=false] - A flag indicating whether the sidebar state is being initialized.
     * @returns {boolean} - Returns `true` if the sidebar is open; otherwise, returns `false`.
     */
    const determineIfSidebarOpen = (selectors, side, initial = false) => {
        const elements = selectors
            .map(selector => document.querySelector(selector))
            .filter(el => el?.classList.contains('is-pressed'));

        if (elements.length > 0) {
            sidebars[side].callbacks.open.call(null, sidebars[side], initial);
            return true;
        }

        sidebars[side].callbacks.close.call(null, sidebars[side], initial);
        return false;
    }

    window.onload = () => {
        for (const side in sidebars) {
            sidebars[side].interval = setInterval(function () {
                sidebars[side].el = document.querySelector(sidebars[side].selector);
                if (!sidebars[side].el) {
                    // no element found yet
                    return;
                }

                // if we found a sidebar, stop the interval
                clearInterval(sidebars[side].interval);

                // check the initial open state of the sidebars
                determineIfSidebarOpen(sidebars[side].toggleSelectors, side, true);

                // take advantage of event bubbling to determine if the button is-pressed or not
                // by attaching the click handler to the body element instead of the button itself
                document.addEventListener('click', e => {
                    [...document.querySelectorAll(sidebars[side].toggleSelectors)]
                        .filter(el => el !== null)
                        .forEach(selector => {
                            if (selector.contains(e.target)) {
                                determineIfSidebarOpen(sidebars[side].toggleSelectors, side);
                            }
                        })
                });

                // initialize jQuery UI Resizable on the sidebar element
                jQuery(sidebars[side].el).resizable({
                    handles: sidebars[side].resizable.handles,
                    start: sidebars[side].resizable.start?.call(null, sidebars[side]),
                    stop: sidebars[side].resizable.stop?.call(null, sidebars[side]),
                    resize: sidebars[side].resizable.resize.call(null, sidebars[side]),
                });
            }, 100)
        }
    };
})();
