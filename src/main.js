/**
 * Created by IvanP on 07.09.2016.
 */

import RVRlauncher from "./rvr-launcher"
import ReportalBase from "r-reporal-base/src/reportal-base";

window.Reportal = window.Reportal || {};
let Reportal = window.Reportal;
ReportalBase.mixin(window.Reportal,{
  RVRlauncher
});

export default RVRlauncher;
