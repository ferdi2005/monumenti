tabgroup = $.index;
var actionBar;
if (Ti.Platform.osname === "android") {
		if (! $.tab.activity) {
			 Ti.API.error("No action bar.");
		} else {
				actionBar = $.tab.getActivity().actionBar;
				if (actionBar) {
						actionBar.setTitle($.tab.title);
				}
		}
}

$.index.open();