import { environment } from "../../../environments/environment";

//custom validators that check two fields match
export const getBrowserName = () => {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
        case agent.indexOf('edge') > -1:
            return 'edge';
        case agent.indexOf('edg') > -1:
            return 'edge';
        case agent.indexOf('opr') > -1 && !!(<any>window).opr:
            return 'opera';
        case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
            return 'chrome';
        case agent.indexOf('trident') > -1:
            return 'ie';
        case agent.indexOf('firefox') > -1:
            return 'firefox';
        case agent.indexOf('safari') > -1:
            return 'safari';
        default:
            return 'other';
    }
}

/**
 * @description if ip not detect then server ip will extract
*/
export const extractIpString = () => {
    let host = environment.host;
    let extractedValue = host.replace('http://', '');
    return extractedValue.split(':')[0];
}