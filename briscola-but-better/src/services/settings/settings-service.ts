import IAppSettingsDTO from "../../dto/appsettings-dto";
import _logger from "../logger/logger-service";
// import appsettings from '../../settings/appsettings.json';

const _appsettings : IAppSettingsDTO = require('../../settings/appsettings.json');

class SettingsService {

    constructor() {
        _logger.Debug(`Appsettings = ${JSON.stringify(_appsettings)}`)
    }

    GetApiUrl() : string {
        return _appsettings.apiUrl
    }

    GetLocalePath() : string {
        return _appsettings.defaultLocale
    }
}

const _appsettingsService : SettingsService = new SettingsService();

export default _appsettingsService;
