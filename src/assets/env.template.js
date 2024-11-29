(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["host"] = process.env.API_URL || 'default_value';
  window["env"]["terminalUrl"] = process.env.TERMINAL_URL || 'default_value';
  window["env"]["GOOGLE_API_KEY"] = process.env.GOOGLE_API_KEY || 'default_value';
  window["env"]["enableBase64"] = true;
})(this);
