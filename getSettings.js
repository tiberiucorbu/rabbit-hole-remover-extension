import {scriptMapping} from "./script-mapping.js";
import {loadItemSettings} from "./loadItemSettings.js";

export async function getSettings() {
    const settings = []
    for (const item of scriptMapping) {
        const options = await loadItemSettings(item.name);
        const setting = {
            name: item.name,
            features:
                item.features.map(feature => {
                    const cutomerFeatureOptions = options?.features.find(f => f.name === feature.name) || {};
                    return {...{name : feature.name, enabled: feature.enabled}, ...cutomerFeatureOptions};
                })
        };
        settings.push(setting)
    }
    return settings;

}
