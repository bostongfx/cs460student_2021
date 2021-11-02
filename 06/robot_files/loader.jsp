



//sessionkey
var var_key = "2ef6525e-3a94-11ec-bab0-128486675253";
var var_dashboard_url = "https://umb.eesysoft.com";
var var_loadfile = "https://umb.eesysoft.com/loadFile";
var var_style_path = "https://umb.eesysoft.com/resources";
var var_stamp = "20211031224152";
var var_eesy_build = "20776";
var var_eesy_dbUpdateCount = "10078";
var var_eesy_userUpdated = undefined;
var var_eesy_style_checksum = "d41d8cd98f00b204e9800998ecf8427e";
var var_show_tab_initial = true;
var var_show_tab = var_show_tab_initial;
var var_open_dashboard_in_new_window = false;
var var_tab_version = 2;
var var_proactive_version = 4;
var var_proactive_lms = "blackboard";
var var_proactive_dark = false;
var var_open_as_chat = false;
var var_moveable_tab = false;
var var_language = -1;
var var_uefMode = false;
var var_uefModeOriginal = !var_uefMode && (window.name === "classic-learn-iframe");
var var_uefModeOriginalUseUefSupportCenter = false;
var isUefOriginalSupportCenter = !var_uefMode && (var_uefModeOriginalUseUefSupportCenter || window.parent.var_uefModeOriginalUseUefSupportCenter);
var var_loadExpertTool = true;
var var_isExpertToolChromePlugin = false;
var eesyTemplates;
var waitforload = false;
var supportTabMinimized = undefined;
var scrollbarRightAdjust = '19px';
var supportTabMoveLimit = '50';
var eesy_minimizedTabWidth = '8px';
var eesy_maximizedTabWidth = '';
var attemptUnobscure = true;
var doNotLoadEngineForUserAgentPattern = 'not_in_use_05231;';
var var_eesy_hiddenHelpItems = undefined;
var var_eesy_sac = undefined;
var var_eesy_helpitemsSeen = undefined;
var var_user_map = {"isDebug":false,"userUpdatedStamp":"20211025052528","supportTabPosition":null,"reset_views_stamp":"","isShowTab":false,"languageId":-1,"isSupportTabMinimized":false,"id":21488};
var var_instance_name = "umb";

function eesy_load_js(jsUrl) {
  var fileref = document.createElement("script");
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", jsUrl);
  document.getElementsByTagName("head")[0].appendChild(fileref);
}

eesy_load_js(var_dashboard_url + "/loader.js?u=" + var_eesy_build);
