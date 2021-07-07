package it.wikimedia.wikilovesmonuments;

import org.appcelerator.titanium.ITiAppInfo;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiProperties;
import org.appcelerator.kroll.common.Log;

/* GENERATED CODE
 * Warning - this class was generated from your application's tiapp.xml
 * Any changes you make here will be overwritten
 */
public final class WlmItaliaAppInfo implements ITiAppInfo
{
	private static final String LCAT = "AppInfo";

	public WlmItaliaAppInfo(TiApplication app) {
	}

	public String getDeployType() {
		return "production";
	}

	public String getId() {
		return "it.wikimedia.wikilovesmonuments";
	}

	public String getName() {
		return "WLM Italia";
	}

	public String getVersion() {
		return "2.0.0";
	}

	public String getPublisher() {
		return "Ferdinando Traversa";
	}

	public String getUrl() {
		return "https://cerca.wikilovesmonuments.it";
	}

	public String getCopyright() {
		return "Ferdinando Traversa - Apache License";
	}

	public String getDescription() {
		return "App per trovare i monumenti partecipanti a Wiki Loves Monuments con la propria posizione.";
	}

	public String getIcon() {
		return "appicon.png";
	}

	public boolean isAnalyticsEnabled() {
		return true;
	}

	public String getGUID() {
		return "46ce9ebb-22ee-4e85-9aaa-e86bff2a2a3d";
	}

	public boolean isFullscreen() {
		return false;
	}

	public String getBuildType() {
		return "";
	}
}
