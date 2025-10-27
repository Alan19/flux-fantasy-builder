import {useHashLocation} from "wouter/use-hash-location";

export function usePrintRoute() {
    const [current, nav] = useHashLocation();

    return async (printPath: string) => {
        const returnTo = current;            // 1. remember where we are
        nav(printPath);                        // 2. go to the printable route
        // TODO Print immediately if you are on the same route
        setTimeout(() => {
            console.log("Delayed for 1 second.");
            window.print();                        // 4. open the print dialog
            nav(returnTo);                         // 5. dialog closes → go back
        }, 650); // 3. let it render
    };
}