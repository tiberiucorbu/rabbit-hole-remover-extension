export async function loadItemSettings(item) {
    let savedItem;
    try {
        let storeValue = await chrome.storage.sync.get([item]);
        console.log(storeValue);
        const key = Object.keys(storeValue).pop();
        savedItem = JSON.parse(storeValue[key]);
    } catch (e) {
        console.log('unable to load item from sync storage', e);
    }
    return savedItem;
}
