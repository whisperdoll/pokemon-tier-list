import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";

function r(a: any, b: any)
{
    return document.location.host === "songsing.github.io" ? a : b;
}

function transform(a: string)
{
    return r("/pokemon-tier-list" + a, a);
}

export function getRouteFor(path: string): string
{
    return transform(path);
}

export default function useHistoryManager()
{
    const history = useHistory();

    function push(path: string)
    {
        history.push(transform(path));
    }

    function replace(path: string)
    {
        history.replace(transform(path));
    }

    return [ push, replace ];
}