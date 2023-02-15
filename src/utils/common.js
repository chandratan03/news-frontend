export function getParamsFromSearchParams(searchParams) {
    let params = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}
