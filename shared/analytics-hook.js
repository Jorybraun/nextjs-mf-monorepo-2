// create shared analytics hook

// const handleInteraction = (action, details) => { }

// const handleImpression = () => {}

const pageView = (page) => {
  console.log(`Page viewed: ${page}`);
}

const timeSpentOnPage = () => {

}

// const addToCart = (product) => {}

// const addToWishlist = (product) => {}

const useAnalytics = () => {
    return {
        pageView,
        timeSpentOnPage,
        addToCart,
        addToWishlist
    }
}

const useTimeOnPage = (page) => {
    // Temporal.Now.instant();
    const startTime = React.useRef(Date.now());

    React.useEffect(() => {
        // we want to calcutate every page visit 
        // duration spent on page
        // and send it to analytics

        // but also send it if the user leaves the page



        pageView(page);
        return () => {
            const endTime = Date.now();
            const duration = endTime - startTime.current;
            console.log(`Time spent on ${page}: ${duration}ms`);
            // this needs to be sent to analytics

            // also beacon in a widow utitly


            timeSpentOnPage(page, duration);
        };

        // do i need an event handler for beforeunload?

    }, [page]);

}   