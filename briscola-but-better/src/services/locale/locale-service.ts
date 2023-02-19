import LoadFile from "../../utils/file-loader";
import _logger from "../logger/logger-service";
import _appsettingsService from "../settings/settings-service";

class LocaleService {
    private _localeStringMap : any = undefined;

    private async LoadLocaleFile() {
        const localeFilePath = _appsettingsService.GetLocalePath()
        this._localeStringMap = await LoadFile(localeFilePath)
            .then(result => {
                _logger.Debug(`${result}`)   
                return result.json()
            })
    }

    async GetLocaleString(key : string) : Promise<string> {
        try {
            if (!this._localeStringMap) {
                await this.LoadLocaleFile()
            }
            return this._localeStringMap[key]
        } catch (e) {
            throw new Error(`Unknown locale identifier: "${key}"`)
        }
    }
}

const _localeService : LocaleService = new LocaleService();

export default _localeService;