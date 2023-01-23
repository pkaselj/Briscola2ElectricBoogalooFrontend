class LoggerService {
    Info(msg : string) {
        console.log(msg)
    }

    Warn(msg : string) {
        console.warn(msg);
    }

    Error(msg : string) {
        console.error(msg);
    }

    Debug(msg : string) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // In development mode, log to console
            console.debug(msg)
        } else {
            // In release mode, do nothing
            ; 
        }
    }
}

const _logger = new LoggerService();

export default _logger;