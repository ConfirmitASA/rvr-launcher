/**
 * Created by IvanP on 08.11.2016.
 */
let launcherCSS = require('./rvr-launcher.css');
/**
 * Creates a launch button to transfer user from current page to AR/VR mode
 * @param {String} VRpageID - id of the page that has the VR setup
 * @param {Boolean} [mobileOnly=false] - whether to show this button only on mobile browsers (exclude desktops)
 * @param {String} [hoverText='Launch this page in AR/VR mode'] - tooltip to show when a user hovers a button (desktop only)
 * */
class RVRlauncher {
  constructor(VRpageID, mobileOnly=false, hoverText='Launch this page in AR/VR mode'){
    if(!VRpageID){throw new Error('VR page ID wasn\'t specified')}
    if(!mobileOnly || RVRlauncher.notDesktop()){
      let button = RVRlauncher.createHTML(hoverText);
      RVRlauncher.setupListener(button,VRpageID);
      document.querySelector('body').appendChild(button);
    }
  }

  /**
   * Adds a click listener to the button and sets window.location to the URL of the VR page
   * @param {HTMLElement} target - the element to attach listener to
   * @param {String} VRpageID - the PageId of the VR page
   * */
  static setupListener(target,VRpageID){
    let loc = RVRlauncher.locationDeserialize(window.location);
    loc.query.frompage = loc.query.pageid;
    loc.query.pageid = VRpageID;
    target.addEventListener('click',()=>{window.location=RVRlauncher.locationSerialize(loc)});
  }

  /**
   * Creates the HTML for the VR button
   * @param {String} [hoverText] - tooltip to show when a user hovers a button (desktop only)
   * @returns {HTMLSpanElement} Returns a `span.RVRlauncher` button
   * */
  static createHTML(hoverText){
    let span = document.createElement('span');
    span.classList.add("RVRlauncher");
    span.setAttribute('text', hoverText);
    span.innerHTML = `<span>AR/VR</span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" version="1.1"><path d="M20.6 6L3.2 6C2.5 6 2 6.6 2 7.3L2 17.7C2 18.4 2.5 19 3.2 19L8 19C8.5 19 8.9 18.7 9.1 18.2L10.5 14.7C10.7 14.1 11.3 13.7 11.9 13.7 12.6 13.7 13.1 14.1 13.4 14.7L14.8 18.2C15 18.7 15.4 19 15.9 19L20.6 19C21.3 19 21.9 18.4 21.9 17.7L21.9 7.3C21.9 6.6 21.3 6 20.6 6L20.6 6ZM7.4 14.8C6.2 14.8 5.2 13.8 5.2 12.5 5.2 11.2 6.2 10.2 7.4 10.2 8.7 10.2 9.6 11.2 9.6 12.5 9.6 13.8 8.6 14.8 7.4 14.8L7.4 14.8ZM16.5 14.8C15.2 14.8 14.3 13.8 14.3 12.5 14.3 11.2 15.2 10.2 16.5 10.2 17.7 10.2 18.7 11.2 18.7 12.5 18.7 13.8 17.7 14.8 16.5 14.8L16.5 14.8Z"/></svg>`;
    return span;
  }

  /**
   * turns `window.location` object into an object with params as named keys necessary to reconstruct the URL
   * @param {Object=} [location = window.location] - a window.location object, by default of the host window where the script is executed
   * @returns {{path:String, query:Object}} a `location` object
   * */
  static locationDeserialize(location = window.location){
    let o = {
      path: location.origin + location.pathname,
      query:{}
    };
    location.search.substring(1).split(/&/).forEach(pair=>{
      let aPair= pair.split(/=/);
      o.query[aPair[0].toLowerCase()] = aPair[1]
    });
    return o
  }

  /**
   * Turns a `location` object (result of `locationDeserialize`) into a URL
   * @param {{path:String, query:Object}} location - an object with params and a url
   * @returns {String} - a URL string
   * */
  static locationSerialize(location){
    let query=[];
    for(let key in location.query){
      query.push([key,location.query[key]].join('='));
    }
    return location.path + '?' + query.join('&');
  }

  /**
   * Checks if the browser is not a Desktop browser, but a tablet or a smartphone
   * @returns {Boolean} whether the browser is mobile
   * */
  static notDesktop(a = navigator.userAgent||navigator.vendor||window.opera){
    //TODO: check for compatible browsers
    return /(anroid|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));
  }
}

export default RVRlauncher;
