import LoadFile from "../../utils/file-loader"
import _logger from "../logger/logger-service"
import { Resource } from "./resource-list"

class ResourceManagerService {
    
    private _resourceList : any = undefined

    private async LoadResourceListFile() {
        this._resourceList = await LoadFile('resource-list.json')
        .then(result => {
            _logger.Debug(`${result}`)   
            return result.json()
        })
    }

    async GetResource<T>(resource : Resource) : Promise<T> {
        try {
            return this.GetResourcePath(resource).then(
                response => {
                    return LoadFile(response).then( result => result as T )
                }
            )
            
        } catch (e) {
            throw new Error(`Unknown resource identifier: "${resource}"`)
        }
    }

    async GetResourcePath(resource : Resource) : Promise<string> {
        try {
            if (!this._resourceList) {
                await this.LoadResourceListFile()
            }
            
            const resourcePath = this._resourceList[resource]

            if (!resourcePath) {
                throw new Error(`Unknown resource identifier: "${resource}"`)
            }
        
            return resourcePath
        } catch (e) {
            throw new Error(`Unknown resource identifier: "${resource}"`)
        }
    }
}

const _resourceManagerService = new ResourceManagerService();
export default _resourceManagerService