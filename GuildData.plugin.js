//META{"name":"GuildData","displayName":"GuildData","website":"https://twitter.com/l0c4lh057//","source":"https://github.com/l0c4lh057/GuildData/blob/master/GuildData.plugin.js"}*//

class GuildData{
	initConstructor () {}
	getName () {return "GuildData";}
	getDescription () {return this.local.description;}
	getVersion () {return "1.1.1";}
	getAuthor () {return "l0c4lh057";}
	
	
	
	
	
	get defaultSettings(){
		return {
			maxUsersShown: 100,
			showChangelogOnUpdate: true,
			language: "auto",
			updateInformationOnGuildChange: true,
			emojiScale: 1.5
		}
	}
	getSettingsPanel() {
		var panel = $("<form>").addClass("form").css("width", "100%");
		if (this.initialized) this.generateSettings(panel);
		return panel[0];
	}

	generateSettings(panel) {
		const defaultForm = 
			`<div class="l0c4lh057 settings item" style="margin-top:0px;">
				<div class="l0c4lh057 settings wrapper" style="position:relative;padding-right:5px;">
					<h3 class="l0c4lh057 settings title ui-form-title h3 margin-reset margin-reset ui-flex-child"></h3>
					<div class="l0c4lh057 settings content" style="position:absolute;top:0px;right:0px;"></div>
				</div>
				<div class="l0c4lh057 settings description ui-form-text style-description margin-top-4" style="flex:1 1 auto;"></div>
			</div>`;
		new PluginSettings.ControlGroup(this.local.settings.title, () => {
			this.saveSettings();
		}, {
			shown: true
		}).appendTo(panel).append(
			new PluginSettings.Checkbox(this.local.settings.showChangelogOnUpdate.title, this.local.settings.showChangelogOnUpdate.description, this.settings.showChangelogOnUpdate,
				(val) => {
					this.settings.showChangelogOnUpdate = val;
				})
		).append(
			new PluginSettings.Checkbox(this.local.settings.updateInformationOnGuildChange.title, this.local.settings.updateInformationOnGuildChange.description, this.settings.updateInformationOnGuildChange,
				(val) => {
					this.settings.updateInformationOnGuildChange = val;
				})
		).append(
			new PluginSettings.Slider(this.local.settings.maxUsersShown.title, this.local.settings.maxUsersShown.description, 10, 1000, 1,
				this.settings.maxUsersShown, (val) => {
					this.settings.maxUsersShown = val;
				}, {width: '170px'}).setLabelUnit(this.local.settings.maxUsersShown.unit)
		).append(
			new PluginSettings.Slider(this.local.settings.emojiScale.title, this.local.settings.emojiScale.description, 0.7, 6, 0.05,
				this.settings.emojiScale, (val) => {
					this.settings.emojiScale = val;
				}, {width: '170px'})
		).append(
			$(defaultForm)
			.find(".description")
			.html(this.local.settings.selectLanguage.description)
			.parent()
			.find(".wrapper")
			.find(".title")
			.html(this.local.settings.selectLanguage.title)
			.parent()
			.find(".content")
			.append(
				$(`<select type="select" id="l0c4lh057 settings select selectLanguage">`)
				.toggleClass('l0c4lh057 settings select selectLanguage')
				.css({
					'float': 'right'
				})
				.html(this.local.settings.selectLanguage)
				.append(
					$(`<option type="option"` + (this.settings.language == "auto" ? " selected" : "") + ` value="auto">${this.local.settings.selectLanguage.entries["auto"]}</option>`)
				)
				.append(
					$(`<option type="option"` + (this.settings.language == "de" ? " selected" : "") + ` value="de">${this.local.settings.selectLanguage.entries["de"]}</option>`)
				)
				.append(
					$(`<option type="option"` + (this.settings.language == "en" ? " selected" : "") + ` value="en">${this.local.settings.selectLanguage.entries["en"]}</option>`)
				)
				.change((val) => {
					if(val.target.value != "auto") this.lang = val.target.value; else this.lang = document.documentElement.getAttribute('lang').split('-')[0];
					this.settings.language = val.target.value;
					this.saveSettings();
					this.insertScript();
				})
			)
			.parent()
			.parent()
		).append(
			$(defaultForm)
			.find(".description")
			.css({
				"margin-top": "20px"
			})
			.toggleClass("ui-form-text style-description margin-top-4")
			.parent()
			.find(".wrapper")
			.find(".content")
			.append(
				$(`<button type="button">`)
				.toggleClass('l0c4lh057 settings button showChangelog')
				.css({
					'float': 'right',
					'margin-top': '-2px'
				})
				.html(this.local.settings.showChangelog)
				.click(() => {
					this.showChangelog();
				})
			)
			.parent()
			.parent()
		);
	}
	
	get changelog(){
		return JSON.parse(`{
			"1.1.0": [
				{
					"title": "Added",
					"type": "added",
					"items": [
						"Button to show changelog in the settings",
						"Option to select the language of the plugin",
						"More click events to copy the shown text (not finished yet)",
						"Guild emojis are now shown in the guild info",
						"Option to stop loading the information on guild change"
					]
				},
				{
					"title": "Fixed",
					"type": "fixed",
					"items": [
						"Channel/role/member count is now visible in the guild info again",
						"Fixed the position of the search result in user information in English language",
						"Fixed the '${this.local.roleInfo.copy}' button. It got created every time the popup opened but never got deleted",
						"Not reloading the information anymore when you change the channel (not the guild)"
					]
				},
				{
					"title": "Changed",
					"type": "changed",
					"items": [
						"Removed some comments in the code that were from the first prototype of this plugin or some functions",
						"Not loading the information of another guild if you selected a guild that is not the one you have currently loaded"
					]
				},
				{
					"title": "Request",
					"type": "request",
					"items": [
						"If you still have some ideas what to add, please write me."
					]
				}
			],
			"1.1.1": [
				{
					"title": "Fixed",
					"type": "fixed",
					"items": [
						"You can open the guild info again if you are currently in a private channel"
					]
				},
				{
					"title": "Changed",
					"type": "changed",
					"items": [
						"Minor translation improvements"
					]
				}
			],
			"1.1.2": [
				{
					"title": "Added",
					"type": "added",
					"items": [
						"Some more copy on click (only user information left)",
						"You can now change the size of the emojis in the emoji list"
					]
				},
				{
					"title": "Changed",
					"type": "changed",
					"items": [
						"Improved ids of copiable elements"
					]
				}
			]
		}`);
	}
	get colors(){
		return JSON.parse(`{
			"added": "lightgreen",
			"fixed": "orange",
			"changed": "green",
			"request": "red",
			"planned": "#7289da"
		}`); // red: #f04747, blue: #7289da, green: #43b581, yellow: #faa61a
	}
	
	get local(){
		if(!this.strings) this.strings = JSON.parse(`{
				"de": {
					"description": "Zeigt Informationen zu Servern an. Wenn du mir beim Übersetzen helfen möchtest, dann wende dich bitte an @l0c4lh057#6731 (ID: 226677096091484160)",
					"startMsg": "{0} wurde gestartet",
					"showGuildData": "Serverinfos anzeigen",
					"copied": "\\"{0}\\" kopiert",
					"guildInfo": {
						"title": "Serverinformationen",
						"owner": "Eigentümer",
						"acronym": "Akronym",
						"createdAt": "Erstellt am",
						"joinedAt": "Beigetreten am",
						"daysAgo": "vor {0} Tagen",
						"explicitContentFilter": {
							"title": "Filter für unangemessene Inhalte",
							"disabled": "Deaktiviert",
							"membersWithoutRole": "Mitglieder ohne Rolle",
							"allMessages": "Alle Nachrichten"
						},
						"defaultMessageNotifications": {
							"title": "Standard-Benachrichtigungen",
							"allMessages": "Alle Nachrichten",
							"mentionsOnly": "Nur Erwähnungen"
						},
						"region": "Standort",
						"memberCount": {
							"title": "Mitgliederzahl",
							"value": "{0} Mitglieder"
						},
						"channelCount": {
							"title": "Kanalanzahl",
							"value": "{0} Kanäle"
						},
						"roleCount": {
							"title": "Rollenanzahl",
							"value": "{0} Rollen"
						},
						"verificationLevel": {
							"title": "Verifizierungs-Level",
							"unrestricted": "Keine Verifizierung benötigt",
							"verifiedEmail": "Verifizierte E-Mail",
							"registered": "Für mindestens 5 Minuten registriert",
							"member": "Für mindestens 10 Minuten Servermitglied",
							"verifiedPhoneNumber": "Verifizierte Handynummer"
						},
						"afkChannel": {
							"title": "AFK-Kanal",
							"noAfkChannel": "Kein AFK-Kanal"
						},
						"afkTimeout": {
							"title": "AFK Timeout",
							"unit": "Sekunden"
						},
						"systemChannel": {
							"title": "System-Kanal",
							"noSystemChannel": "Kein System-Kanal"
						},
						"features": "Features",
						"relationships": {
							"friends": {
								"title": "Freunde",
								"value": "{0} Freunde",
								"noUsers": "Du hast keine Freunde auf diesem Server."
							},
							"blocked": {
								"title": "Blockiert",
								"value": "{0} blockierte Nutzer",
								"noUsers": "Du hast kein Mitglied dieses Servers blockiert."
							}
						}
					},
					"userInfo": {
						"title": "Nutzerinformationen",
						"usersFound": "{0} Nutzer für \\"{1}\\" gefunden",
						"tooManyUsers": "Es wurden {0} Nutzer gefunden. Bitte erhöhe die Genauigkeit deiner Suche.",
						"nickname": "Nickname",
						"color": {
							"title": "Farbe",
							"example": "Beispiel"
						},
						"hoistRole": {
							"title": "Angepinnte Rolle",
							"noHoistRole": "Keine angepinnte Rolle"
						},
						"roles": "Rollen",
						"isBot": "Ist Bot",
						"createdAt": "Registriert am",
						"status": {
							"title": "Status",
							"online": "Online",
							"offline": "Offline",
							"dnd": "Bitte nicht stören",
							"idle": "Abwesend"
						},
						"activity":{
							"title": "Aktivität",
							"noActivity": "Keine Aktivität",
							"for": "seit {0}",
							"playing": "Spielt",
							"watching": "Schaut",
							"listening": "Hört",
							"streaming": "Streamt"
						},
						"searchUser": "Suchen",
						"openChat": "Chat öffnen"
					},
					"roleInfo": {
						"title": "Rolleninformationen",
						"mentionable": "Erwähnbar",
						"color": {
							"title": "Farbe",
							"example": "Beispiel",
							"noColor": "Keine Farbe eingestellt"
						},
						"hoist": "Angepinnt",
						"copy": "Kopieren"
					},
					"channelInfo": {
						"title": "Kanalinformationen",
						"channel": "Kanal",
						"channelType": {
							"title": "Kanal-Typ",
							"category": "Kategorie",
							"textChannel": "Text-Kanal",
							"voiceChannel": "Sprach-Kanal"
						},
						"topic": "Thema",
						"position": "Position",
						"userLimit": "Maximale Nutzer-Zahl",
						"nsfw": "NSFW",
						"bitrate": "Bitrate",
						"slowmode": {
							"title": "Slowmode",
							"value": "{0} Sekunden"
						},
						"role": "Rolle",
						"member": "Nutzer",
						"permissions": {
							"type": "Typ",
							"allow": "Erlaubt",
							"deny": "Verboten"
						},
						"openChat": "Chat öffnen",
						"connect": "Verbinden"
					},
					"settings": {
						"title": "Einstellungen",
						"maxUsersShown": {
							"title": "Maximale Anzahl angezeigter Benutzer",
							"description": "maximale Anzahl an Nutzern, die in den Nutzerinformationen angezeigt werden (mehr Nutzer -> längere Ladezeit), standard: 100",
							"unit": " Benutzer"
						},
						"showChangelogOnUpdate": {
							"title": "Änderungsprotokoll nach Update anzeigen",
							"description": "Zeigt das Änderungsprotokoll nach dem ersten Start des Plugins an, wenn du es geupdatet hast."
						},
						"updateInformationOnGuildChange": {
							"title": "Infos beim Serverwechsel neu laden",
							"description": "Lädt, wenn du den Server wechselst, die Infos zum neuen aktuellen Server"
						},
						"showChangelog": "Änderungsprotokoll anzeigen",
						"selectLanguage": {
							"title": "Sprache auswählen",
							"description": "Ändert die Sprache, die im Plugin verwendet wird",
							"entries": {
								"auto": "Automatisch erkennen",
								"de": "Deutsch",
								"en": "Englisch"
							}
						},
						"emojiScale": {
							"title": "Emojigröße",
							"description": "Hier kannst du die Größe der Emojis in der Emoji-Liste ändern, standard: 1.5 (6 = die Emojis werden als Galerie ohne Namen angezeigt)"
						}
					},
					"permissions": {
						"title": "Berechtigungen",
						"notAllowed": "Darf nicht",
						"manageEmojis": "Emojis verwalten",
						"manageWebhooks": "WebHooks verwalten",
						"manageRoles": "Rollen verwalten",
						"manageNicknames": "Nicknamen verwalten",
						"changeNickname": "Nickname ändern",
						"useVoiceActivity": "Sprachaktivierung verwenden",
						"moveMembers": "Mitglieder verschieben",
						"deafenMembers": "Mitglieder taub schalten",
						"muteMembers": "Mitglieder stummschalten",
						"speak": "Sprechen",
						"connect": "Verbinden",
						"useExternalEmojis": "Externe Emojis verwenden",
						"mentionEveryone": "Alle erwähnen",
						"readMessageHistory": "Nachrichtenverlauf lesen",
						"attachFiles": "Dateien anhängen",
						"embedLinks": "Links einbetten",
						"manageMessages": "Nachrichten verwalten",
						"sendTtsMessages": "TTS-Nachrichten senden",
						"sendMessages": "Nachrichten senden",
						"viewChannelReadMessages": "Kanal anzeigen",
						"prioritySpeaker": "Priority Speaker",
						"viewAuditLog": "Audit-Log anzeigen",
						"addReactions": "Reaktionen hinzufügen",
						"manageServer": "Server verwalten",
						"manageChannels": "Kanäle verwalten",
						"administrator": "Administrator",
						"banMembers": "Mitglieder bannen",
						"kickMembers": "Mitglieder kicken",
						"createInstantInvite": "Soforteinladung erstellen"
					},
					"time": {
						"short": {
							"years": "y",
							"months": "m",
							"days": "d",
							"hours": "h",
							"minutes": "min",
							"seconds": "s"
						},
						"long": {
							"years": "Jahre",
							"year": "Jahr",
							"months": "Monate",
							"month": "Monat",
							"days": "Tage",
							"day": "Tag",
							"hours": "Stunden",
							"hour": "Stunde",
							"minutes": "Minuten",
							"minute": "Minute",
							"seconds": "Sekunden",
							"second": "Sekunde"
						}
					},
					"changelog": {
						"title": "Änderungsprotokoll",
						"updated": {
							"title": "Version geupdatet",
							"additionalContent": "Du hast von Version {0} zu Version {1} geupdated"
						},
						"fullChangelogInfo": "Hier werden nur die Änderungen der letzten drei Versionen angezeigt. Um das komplette Änderungsprotokoll einzusehen, schau auf diese Website: {0}"
					},
					"emojis": {
						"title": "Server-Emojis",
						"value": "{0} Emojis",
						"animated": "Animiert",
						"managed": "Gemanaged",
						"requireColons": "Erfordert Doppelpunkt",
						"whitelist": "Gewhitelistete Rollen"
					}
				},
				"en": {
					"description": "Shows something about guilds. If you want to help translating, please contact @l0c4lh057#6731 (id: 226677096091484160)",
					"startMsg": "{0} started",
					"showGuildData": "Show Guild Data",
					"copied": "Copied \\"{0}\\"",
					"guildInfo": {
						"title": "Guild Information",
						"owner": "Owner",
						"acronym": "Acronym",
						"createdAt": "Created at",
						"joinedAt": "Joined at",
						"daysAgo": "{0} days ago",
						"explicitContentFilter": {
							"title": "Explicit content filter",
							"disabled": "Disabled",
							"membersWithoutRole": "Members without role",
							"allMessages": "All messages"
						},
						"defaultMessageNotifications": {
							"title": "Default message notifications",
							"allMessages": "All messages",
							"mentionsOnly": "Mentions only"
						},
						"region": "Region",
						"memberCount": {
							"title": "Member count",
							"value": "{0} members"
						},
						"channelCount": {
							"title": "Channel count",
							"value": "{0} channels"
						},
						"roleCount": {
							"title": "Role count",
							"value": "{0} roles"
						},
						"verificationLevel": {
							"title": "Verification level",
							"unrestricted": "Unrestricted",
							"verifiedEmail": "Verified email needed",
							"registered": "Registered for longer than 5 minutes",
							"member": "Guild member for longer than 10 minutes",
							"verifiedPhoneNumber": "Verified phone number"
						},
						"afkChannel": {
							"title": "AFK channel",
							"noAfkChannel": "No afk channel"
						},
						"afkTimeout": {
							"title": "AFK timeout",
							"unit": "seconds"
						},
						"systemChannel": {
							"title": "System Channel",
							"noSystemChannel": "No system channel"
						},
						"features": "Features",
						"relationships": {
							"friends": {
								"title": "Friends",
								"value": "{0} friends",
								"noUsers": "There are no friends in this guild"
							},
							"blocked": {
								"title": "Blocked",
								"value": "{0} blocked users",
								"noUsers": "There are no blocked users in this guild"
							}
						}
					},
					"userInfo": {
						"title": "User Information",
						"usersFound": "Found {0} entries for \\"{1}\\"",
						"tooManyUsers": "There are {0} entries. Please specify your search.",
						"nickname": "Nickname",
						"color": {
							"title": "Color",
							"example": "Example"
						},
						"hoistRole": {
							"title": "Hoist role",
							"noHoistRole": "No hoist role"
						},
						"roles": "Roles",
						"isBot": "Is bot",
						"createdAt": "Created at",
						"status": {
							"title": "Status",
							"online": "Online",
							"offline": "Offline",
							"dnd": "Do not disturb",
							"idle": "Idle"
						},
						"activity":{
							"title": "Activity",
							"noActivity": "No activity",
							"for": "for {0}",
							"playing": "Playing",
							"watching": "Watching",
							"listening": "Listening",
							"streaming": "Streaming"
						},
						"searchUser": "Search User",
						"openChat": "Open Chat"
					},
					"roleInfo": {
						"title": "Role Information",
						"mentionable": "Mentionable",
						"color": {
							"title": "Color",
							"example": "Example",
							"noColor": "No color set"
						},
						"hoist": "Hoist",
						"copy": "Copy"
					},
					"channelInfo": {
						"title": "Channel Information",
						"channel": "Channel",
						"channelType": {
							"title": "Channel type",
							"category": "Category",
							"textChannel": "Text channel",
							"voiceChannel": "Voice channel"
						},
						"topic": "Topic",
						"position": "Position",
						"userLimit": "User limit",
						"nsfw": "NSFW",
						"bitrate": "Bitrate",
						"slowmode": {
							"title": "Slowmode",
							"value": "{0} seconds"
						},
						"role": "Role",
						"member": "Member",
						"permissions": {
							"type": "Type",
							"allow": "Allow",
							"deny": "Deny"
						},
						"openChat": "Open Chat",
						"connect": "Connect"
					},
					"settings": {
						"title": "Settings",
						"maxUsersShown": {
							"title": "Max shown user count",
							"description": "max amount of users shown in the user information (more users -> longer loading time), default: 100",
							"unit": " users"
						},
						"showChangelogOnUpdate": {
							"title": "Show changelog on update",
							"description": "Shows the changelog on plugin start, when you have updated it."
						},
						"updateInformationOnGuildChange": {
							"title": "Show Information On Guild Change",
							"description": "When you change the guild, the information will automatically update to the new current guild"
						},
						"showChangelog": "Show Changelog",
						"selectLanguage": {
							"title": "Select language",
							"description": "Change the language that is used in the plugin",
							"entries": {
								"auto": "Detect automatically",
								"de": "German",
								"en": "English"
							}
						},
						"emojiScale": {
							"title": "Emoji Scale",
							"description": "Here you can change the size of the emojis in the emoji list, default: 1.5 (6 = emojis are shown in a gallery without their names)"
						}
					},
					"permissions": {
						"title": "Permissions",
						"notAllowed": "Not allowed",
						"manageEmojis": "Manage Emojis",
						"manageWebhooks": "Manage Webhooks",
						"manageRoles": "Manage Roles",
						"manageNicknames": "Manage Nicknames",
						"changeNickname": "Change Nickname",
						"useVoiceActivity": "Use Voice Activity",
						"moveMembers": "Move Members",
						"deafenMembers": "Deafen Members",
						"muteMembers": "Mute Members",
						"speak": "Speak",
						"connect": "Connect",
						"useExternalEmojis": "Use External Emojis",
						"mentionEveryone": "Mention Everyone",
						"readMessageHistory": "Read Message History",
						"attachFiles": "Attach Files",
						"embedLinks": "Embed Links",
						"manageMessages": "Manage Messages",
						"sendTtsMessages": "Send TTS Messages",
						"sendMessages": "Send Messages",
						"viewChannelReadMessages": "View Channel",
						"prioritySpeaker": "Priority Speaker",
						"viewAuditLog": "View Audit Log",
						"addReactions": "Add Reactions",
						"manageServer": "Manage Server",
						"manageChannels": "Manage Channels",
						"administrator": "Administrator",
						"banMembers": "Ban Members",
						"kickMembers": "Kick Members",
						"createInstantInvite": "Create Instant Invite"
					},
					"time": {
						"short": {
							"years": "y",
							"months": "m",
							"days": "d",
							"hours": "h",
							"minutes": "min",
							"seconds": "s"
						},
						"long": {
							"years": "years",
							"year": "year",
							"months": "months",
							"month": "month",
							"days": "days",
							"day": "day",
							"hours": "hours",
							"hour": "hour",
							"minutes": "minutes",
							"minute": "minute",
							"seconds": "seconds",
							"second": "second"
						}
					},
					"changelog": {
						"title": "Changelog",
						"updated": {
							"title": "Version updated",
							"additionalContent": "You updated from version {0} to version {1}"
						},
						"fullChangelogInfo": "Here are only the changes of the last three versions. To get a list of all changes, visit this page: {0}"
					},
					"emojis": {
						"title": "Guild Emojis",
						"value": "{0} emojis",
						"animated": "Animated",
						"managed": "Managed",
						"requireColons": "Require Colons",
						"whitelist": "Whitelisted Roles"
					}
				}
			}`);
		return this.strings[this.lang] || this.strings.en;
	}
	
	start(){
		var self = this;
		if(typeof PluginUtilities === "undefined" || typeof InternalUtilities === "undefined"){
			setTimeout(function(){self.start()}, 1000);
		}else{
			PluginUtilities.checkForUpdate(this.getName(), this.getVersion(), "https://raw.githubusercontent.com/l0c4lh057/GuildData/master/GuildData.plugin.js");
			this.initialize();
		}
	}
	initialize(){
		this.initialized = true;
		this.loadSettings();
		this.lang = document.documentElement.getAttribute('lang').split('-')[0];
		if(this.settings.language != "auto") this.lang = this.settings.language;
		PluginUtilities.showToast(`${this.formatText(this.local.startMsg, [this.getName() + ' ' + this.getVersion()])}`, {type:"success"});
		
		this.guildModule = InternalUtilities.WebpackModules.findByUniqueProperties(["getGuild"]);
		this.userModule = InternalUtilities.WebpackModules.findByUniqueProperties(["getUser"]);
		this.memberModule = InternalUtilities.WebpackModules.findByUniqueProperties(["getMember"]);
		this.channelModule = InternalUtilities.WebpackModules.findByUniqueProperties(["getChannel"]);
		this.UserMetaStore = InternalUtilities.WebpackModules.findByUniqueProperties(["getStatus", "getOnlineFriendCount"]);
		this.privateChannelActions = InternalUtilities.WebpackModules.findByUniqueProperties(["openPrivateChannel"]);
		this.channelActions = InternalUtilities.WebpackModules.findByUniqueProperties(["selectPrivateChannel"]);
		this.channelSelector = InternalUtilities.WebpackModules.findByUniqueProperties(["selectGuild", "selectChannel"]);
		this.relationshipStore = InternalUtilities.WebpackModules.findByUniqueProperties(['isBlocked', 'getFriendIDs']);
		this.emojiUtils = InternalUtilities.WebpackModules.findByUniqueProperties(['getGuildEmoji']);
		this.DiscordPerms = Object.assign({}, DiscordModules.DiscordConstants.Permissions);
		
		this.css = `
		.l0c4lh057.popup{
			background-color: #202225;
			color: lightgray;
		}
		h3.l0c4lh057{
			text-align: center;
			font-size: 150%;
		}
		.l0c4lh057::-webkit-scrollbar {
			width: 0.8em;
			height: 0.8em;
			background-color: #666;
		}
		.l0c4lh057::-webkit-scrollbar-track {
			-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		}
		.l0c4lh057::-webkit-scrollbar-thumb {
			background-color: #333;
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
		}
		.l0c4lh057::-webkit-scrollbar-corner{
			background-color: #444;
		}
		.l0c4lh057{
			-webkit-user-select: text;
		}
		.l0c4lh057 > table > tbody > tr:nth-child(even), .l0c4lh057.popup.gEmoji.role{
			background-color: #2b2b2b;
		}
		.l0c4lh057 > table{
			background-color: #1f1f1f;
			border-spacing: 0px 6px;
		}
		`
		
		var self = this;
		
		$(".container-2Rl01u.da-container").click(function() {
			if(!document.getElementsByClassName('container-2Rl01u da-container popout-open')[0]){
				var exi = false;
				var checkExist = setInterval(function() {
					if ($('.popout-3sVMXz.da-popout.popoutBottom-1YbShG.popoutbottom').length) {
						if(exi){
							clearInterval(checkExist);
							var liste = document.getElementsByClassName('menu-Sp6bN1 da-menu')[0];
							var sep = document.createElement('div');
							sep.className = 'separator-2zcjq8 da-separator';
							liste.appendChild(sep);
							var itm = document.createElement('div');
							itm.className = 'item-1GzJrl da-item l0c4lh057 showonclick';
							itm.innerHTML = '<div class="icon-2doZ3q da-icon" style="background-image: url(&quot;/assets/50f8ef2cdb4e7697a4202fb9c6d0e1fc.svg&quot;);"></div><div class="label-1Y-LW5 da-label">' + self.local.showGuildData + '</div>';
							liste.appendChild(itm);
							document.getElementsByClassName('popout-3sVMXz da-popout popoutBottom-1YbShG popoutbottom')[0].style.height = (document.getElementsByClassName('popout-3sVMXz da-popout popoutBottom-1YbShG popoutbottom')[0].offsetHeight + sep.offsetHeight + itm.offsetHeight) + 'px';
							document.getElementsByClassName('menu-Sp6bN1 da-menu')[0].style.height = (document.getElementsByClassName('menu-Sp6bN1 da-menu')[0].offsetHeight + sep.offsetHeight + itm.offsetHeight) + 'px';
							
							$(".item-1GzJrl.da-item.l0c4lh057.showonclick").click(function() {
								$(document.querySelector('.container-2Rl01u.popout-open')).click();
								self.getServer(PluginUtilities.getCurrentServer());
							});
						}
						exi = true;
					}
				}, 110);
			}
		});
		
		if(!document.getElementById('l0c4lh057 popup outer')){
			var popupWindow = document.createElement('div');
			popupWindow.className = 'l0c4lh057 popup outer';
			popupWindow.id = 'l0c4lh057 popup outer';
			popupWindow.style.display = 'none';
			popupWindow.style.position = 'absolute';
			popupWindow.style.left = '10%';
			popupWindow.style.top = '10%';
			popupWindow.style.width = '80%';
			popupWindow.style.height = '80%';
			popupWindow.style.borderRadius = '10px';
			popupWindow.style.boxShadow = '#191919 0px 0px 50px 30px';
			popupWindow.style.zIndex = '101';
			document.getElementsByClassName('layer-3QrUeG')[0].appendChild(popupWindow);
			
			var popupInner = document.createElement('div');
			popupInner.className = 'l0c4lh057 popup';
			popupInner.id = 'l0c4lh057 popup inner';
			popupInner.style.position = 'absolute';
			popupInner.style.overflowY = 'auto';
			popupInner.style.left = '50px';
			popupInner.style.top = '50px';
			popupInner.style.width = 'calc(100% - 100px)';
			popupInner.style.height = 'calc(100% - 100px)';
			popupWindow.appendChild(popupInner);
			
			var guildInformation = document.createElement('div');
			guildInformation.className = 'l0c4lh057 popup';
			guildInformation.id = 'l0c4lh057 popup guild information';
			guildInformation.style.position = 'absolute';
			guildInformation.style.overflowY = 'auto';
			guildInformation.style.left = '0%';
			guildInformation.style.top = '0%';
			guildInformation.style.width = 'calc(50% - 25px)';
			guildInformation.style.height = 'calc(50% - 25px)';
			guildInformation.style.padding = '5px';
			guildInformation.style.border = '2px grey solid';
			guildInformation.style.borderRadius = '5px';
			guildInformation.style.zIndex = '5';
			popupInner.appendChild(guildInformation);
			
			var guildRelations = document.createElement('div');
			guildRelations.className = 'l0c4lh057 popup';
			guildRelations.id = 'l0c4lh057 popup guild relations';
			guildRelations.style.position = 'absolute';
			guildRelations.style.overflowY = 'auto';
			guildRelations.style.left = '0%';
			guildRelations.style.top = '0%';
			guildRelations.style.width = 'calc(50% - 25px)';
			guildRelations.style.height = 'calc(50% - 25px)';
			guildRelations.style.padding = '5px';
			guildRelations.style.border = '2px grey solid';
			guildRelations.style.borderRadius = '5px';
			guildRelations.style.zIndex = '0';
			popupInner.appendChild(guildRelations);
			
			var guildEmojis = document.createElement('div');
			guildEmojis.className = 'l0c4lh057 popup';
			guildEmojis.id = 'l0c4lh057 popup guild emojis';
			guildEmojis.style.position = 'absolute';
			guildEmojis.style.overflowY = 'auto';
			guildEmojis.style.left = '0%';
			guildEmojis.style.top = '0%';
			guildEmojis.style.width = 'calc(50% - 25px)';
			guildEmojis.style.height = 'calc(50% - 25px)';
			guildEmojis.style.padding = '5px';
			guildEmojis.style.border = '2px grey solid';
			guildEmojis.style.borderRadius = '5px';
			guildEmojis.style.zIndex = '0';
			popupInner.appendChild(guildEmojis);
			
			var guildEmojiInfo = document.createElement('div');
			guildEmojiInfo.className = 'l0c4lh057 popup';
			guildEmojiInfo.id = 'l0c4lh057 popup guild emojiinfo';
			guildEmojiInfo.style.position = 'absolute';
			guildEmojiInfo.style.overflowY = 'auto';
			guildEmojiInfo.style.left = '0%';
			guildEmojiInfo.style.top = '0%';
			guildEmojiInfo.style.width = 'calc(50% - 25px)';
			guildEmojiInfo.style.height = 'calc(50% - 25px)';
			guildEmojiInfo.style.padding = '5px';
			guildEmojiInfo.style.border = '2px grey solid';
			guildEmojiInfo.style.borderRadius = '5px';
			guildEmojiInfo.style.zIndex = '0';
			popupInner.appendChild(guildEmojiInfo);
			
			var userContainer = document.createElement('div');
			userContainer.className = 'l0c4lh057 popup';
			userContainer.id = 'l0c4lh057 popup userContainer';
			userContainer.style.right = '0%';
			userContainer.style.top = '0%';
			userContainer.style.width = 'calc(calc(50% - 25px) + 14px)';
			userContainer.style.height = 'calc(calc(50% - 25px) + 14px)';
			userContainer.style.position = 'absolute';
			popupInner.appendChild(userContainer);
			
			var userSearch = document.createElement('div');
			userSearch.className = 'l0c4lh057 popup';
			userSearch.id = 'l0c4lh057 popup userSearch';
			userSearch.style.overflowY = 'auto';
			userSearch.style.height = 'calc(100% - 14px)';
			userSearch.style.padding = '5px';
			userSearch.style.border = '2px grey solid';
			userSearch.style.borderRadius = '5px';
			userSearch.style.zIndex = '10';
			userSearch.style.position = 'absolute';
			userSearch.style.top = '0%';
			userSearch.style.width = 'calc(100% - 14px)';
			userSearch.innerHTML = `<h3 class="l0c4lh057">${this.local.userInfo.title}</h3>`;
			userContainer.appendChild(userSearch);
			
			var userInformation = document.createElement('div');
			userInformation.className = 'l0c4lh057 popup';
			userInformation.id = 'l0c4lh057 popup user information';
			userInformation.style.overflowY = 'auto';
			userInformation.style.height = 'calc(100% - 14px)';
			userInformation.style.padding = '5px';
			userInformation.style.border = '2px grey solid';
			userInformation.style.borderRadius = '5px';
			userInformation.style.zIndex = '5';
			userInformation.style.position = 'absolute';
			userInformation.style.top = '0%';
			userInformation.style.width = 'calc(100% - 14px)';
			userInformation.innerHTML = `<h3 class="l0c4lh057">${this.local.userInfo.title}</h3>`;
			userContainer.appendChild(userInformation);
			
			var roleContainer = document.createElement('div');
			roleContainer.className = 'l0c4lh057 popup';
			roleContainer.id = 'l0c4lh057 popup roleContainer';
			roleContainer.style.right = '0%';
			roleContainer.style.bottom = '0%';
			roleContainer.style.width = 'calc(calc(50% - 25px) + 14px)';
			roleContainer.style.height = 'calc(calc(50% - 25px) + 14px)';
			roleContainer.style.zIndex = '10';
			roleContainer.style.position = 'absolute';
			popupInner.appendChild(roleContainer);
			
			var roleSearch = document.createElement('div');
			roleSearch.className = 'l0c4lh057 popup';
			roleSearch.id = 'l0c4lh057 popup roleSearch';
			roleSearch.style.overflowY = 'auto';
			roleSearch.style.height = 'calc(100% - 14px)';
			roleSearch.style.border = '2px grey solid';
			roleSearch.style.borderRadius = '5px';
			roleSearch.style.padding = '5px';
			roleSearch.innerHTML = `<h3 class="l0c4lh057">${this.local.roleInfo.title}</h3>`;
			roleContainer.appendChild(roleSearch);
			
			var rolePermissionInformation = document.createElement('div');
			rolePermissionInformation.className = 'l0c4lh057 popup';
			rolePermissionInformation.id = 'l0c4lh057 popup role permission';
			rolePermissionInformation.style.overflowY = 'auto';
			rolePermissionInformation.style.position = 'absolute';
			rolePermissionInformation.style.right = '0%';
			rolePermissionInformation.style.bottom = '0%';
			rolePermissionInformation.style.width = 'calc(50% - 25px)';
			rolePermissionInformation.style.height = 'calc(50% - 25px)';
			rolePermissionInformation.style.padding = '5px';
			rolePermissionInformation.style.border = '2px grey solid';
			rolePermissionInformation.style.borderRadius = '5px';
			rolePermissionInformation.style.zIndex = '5';
			rolePermissionInformation.innerHTML = `<h3 class="l0c4lh057">${this.local.roleInfo.title}</h3>`;
			popupInner.appendChild(rolePermissionInformation);
			
			var channelSearch = document.createElement('div');
			channelSearch.className = 'l0c4lh057 popup';
			channelSearch.id = 'l0c4lh057 popup channelSearch';
			channelSearch.style.position = 'absolute';
			channelSearch.style.overflowY = 'auto';
			channelSearch.style.left = '0%';
			channelSearch.style.bottom = '0%';
			channelSearch.style.width = 'calc(50% - 25px)';
			channelSearch.style.height = 'calc(50% - 25px)';
			channelSearch.style.padding = '5px';
			channelSearch.style.border = '2px grey solid';
			channelSearch.style.borderRadius = '5px';
			channelSearch.style.zIndex = '10';
			channelSearch.innerHTML = `<h3 class="l0c4lh057">${this.local.channelInfo.title}</h3>`;
			popupInner.appendChild(channelSearch);
			
			var sChannelSearch = document.createElement('div');
			sChannelSearch.className = 'l0c4lh057 popup';
			sChannelSearch.id = 'l0c4lh057 popup sChannelSearch';
			sChannelSearch.style.position = 'absolute';
			sChannelSearch.style.overflowY = 'auto';
			sChannelSearch.style.left = '0%';
			sChannelSearch.style.bottom = '0%';
			sChannelSearch.style.width = 'calc(50% - 25px)';
			sChannelSearch.style.height = 'calc(50% - 25px)';
			sChannelSearch.style.padding = '5px';
			sChannelSearch.style.border = '2px grey solid';
			sChannelSearch.style.borderRadius = '5px';
			sChannelSearch.style.zIndex = '5';
			popupInner.appendChild(sChannelSearch);
			
			var channelPermission = document.createElement('div');
			channelPermission.className = 'l0c4lh057 popup';
			channelPermission.id = 'l0c4lh057 popup channel permission';
			channelPermission.style.position = 'absolute';
			channelPermission.style.overflowY = 'auto';
			channelPermission.style.left = '0%';
			channelPermission.style.bottom = '0%';
			channelPermission.style.width = 'calc(50% - 25px)';
			channelPermission.style.height = 'calc(50% - 25px)';
			channelPermission.style.padding = '5px';
			channelPermission.style.border = '2px grey solid';
			channelPermission.style.borderRadius = '5px';
			channelPermission.style.zIndex = '5';
			popupInner.appendChild(channelPermission);
			
			var btnClose = document.createElement('div');
			btnClose.className = 'l0c4lh057 popup close';
			btnClose.style.position = 'absolute';
			btnClose.style.top = '6px';
			btnClose.style.right = '6px';
			btnClose.style.fontWeight = 'bold';
			btnClose.style.color = 'red';
			btnClose.style.cursor = 'default';
			btnClose.style.fontSize = '150%';
			btnClose.innerHTML = 'X';
			btnClose.onclick = function() { 
				if(document.getElementById('l0c4lh057 popup user openChat')) document.getElementById('l0c4lh057 popup user openChat').style.zIndex = '0';
				if(document.getElementById('l0c4lh057 popup user back')) document.getElementById('l0c4lh057 popup user back').outerHTML = '';
				document.getElementById('l0c4lh057 popup outer').style.display = 'none';
				document.getElementById('l0c4lh057 popup guild relations').style.zIndex = '0';
			};
			popupWindow.appendChild(btnClose);
		}
		
		this.insertScript();
		
		BdApi.injectCSS(this.getName(), this.css);
		
		this.addContextMenuEvent();
		
		if(!this.settings.lastUsedVersion){ // started the first time
			this.showWelcomeMessage();
			this.settings.lastUsedVersion = this.getVersion();
			this.saveSettings();
		}else if(this.settings.lastUsedVersion != this.getVersion()){ // updated
			if(this.settings.showChangelogOnUpdate) this.showChangelog(this.settings.lastUsedVersion, this.getVersion());
			this.settings.lastUsedVersion = this.getVersion();
			this.saveSettings();
		}
	}
	
	showWelcomeMessage(){
		var self = this;
		this.alertText('Welcome', `<p>GuildData is a plugin that displays the Guild Information such as the owner, when the server was created, when you joined, their verification level, etc. As well as user, channel, and role information which is very detailed.</p>
		<p>To use this plugin, rigth click a guild in the guild list and click on the item "${this.local.showGuildData}" in the context menu. You can also click on the name of a guild above the channel list and click the button with the text "${this.local.showGuildData}" there.</p>
		<button class="l0c4lh057 welcomemessage showchangelog" style="position:absolute;bottom:5px;right:5px;background-color:#677bc4;color:#fff">Show Changelog</button>`);
		$(".l0c4lh057.welcomemessage.showchangelog").click(function() {
			self.showChangelog();
		});
	}
	showChangelog(oldVersion, newVersion){
		var c = ``;
		var t = this.local.changelog.title;
		if(oldVersion && newVersion){
			c = `<p style="font-size:150%;font-weight:700;text-align:center;">${this.formatText(this.local.changelog.updated.additionalContent, [oldVersion, newVersion])}<br>`;
			t = this.local.changelog.updated.title;
		}
		for(const v in this.changelog){
			c += `<div`
			if(v == this.getVersion()) c += ` style="background-color:#2d2d31;border:2px #a7a7a7;border-style:solid;border-radius:7px;padding:5px;"`;
			c += `><div style="font-size:140%;padding-bottom:10px;font-weight:900;">v${v}</div><div style="padding-left:10px;">`;
			for(const v2 of this.changelog[v]){
				c += `<div style="padding-bottom:7px;"><div style="color:${this.colors[v2.type]};padding-bottom:3px;font-weight:600;">${v2.title}</div><ul style="list-style:none;">`;
				for(const v3 of v2.items){
					c += `<li><div style="padding-left:10px;padding-top:3px;">- ${v3}</div></li>`;
				}
				c += `</ul></div>`;
			}
			c += `</div></div>`;
		}
		c += `<br><br><div style="font-size:125%;color:lightsalmon">${this.formatText(this.local.changelog.fullChangelogInfo, '<a href="https://github.com/l0c4lh057/GuildData/blob/master/changelog" target="_blank">https://github.com/l0c4lh057/GuildData/blob/master/changelog</a>')}</div>`;
		
		this.alertText(t, c);
	}
	
	addContextMenuEvent() {
		$(document).on('contextmenu.' + this.getName(), (e) => {
			this.addContextMenuItems(e);
		})
	}
	
	addContextMenuItems(e) {
		if(e.target.parentElement.href){
			if(e.target.parentElement.href.includes('/channels/@me/')) return; /* return if it's a private channel/group channel */
			let CSSRules = getMatchedCSSRules(e.toElement);
			let context = document.querySelector('.contextMenu-HLZMGh');
			if (!CSSRules) return;
			let CSSRule = CSSRules.item(CSSRules.length - 1);
			let currentWin = this.currentWindow;
			let subMenu = new PluginContextMenu.TextItem(this.local.showGuildData, {
				callback: () => {
					var guildId = (e.target.parentElement.href.match(/\d+/) || [])[0];
					this.getServer(this.guildModule.getGuild(guildId));
					$(context).hide();
				}
			})

			let testGroup = new PluginContextMenu.ItemGroup().addItems(subMenu);
			let newMenu = new PluginContextMenu.Menu();

			if (!context) {
				context = newMenu.element;
				newMenu.addGroup(testGroup);

				newMenu.show(e.clientX, e.clientY);
				return;
			}
			if (context.classList.contains("plugin-context-menu")) return;
			$(context).find('.itemGroup-1tL0uz').last().append(testGroup.element);
		}
	}
	
	insertScript(){
		if(document.getElementById('l0c4lh057 script copy')) document.getElementById('l0c4lh057 script copy').outerHTML = '';
		var insertedScript = document.createElement('script');
		insertedScript.id = 'l0c4lh057 script copy';
		insertedScript.innerHTML = `
					function formatText4Dg3g5(source, params) {
						if(typeof params === "string") params = [params];
						$.each(params,function (i, n) {
							source = source.replace(new RegExp("\\\\{" + i + "\\\\}", "g"), n);
						})
						return source;
					}
					function copySelectedElement4Dg3g5(selElement){
						var tempInput = document.createElement('INPUT');
						document.body.appendChild(tempInput);
						tempInput.setAttribute('value', document.getElementById(selElement).innerHTML)
						tempInput.select();
						document.execCommand('copy');
						document.body.removeChild(tempInput);
						PluginUtilities.showToast(formatText4Dg3g5("${this.local.copied.replace(/"/g, '\\"')}", document.getElementById(selElement).innerHTML), {type:"success"});
					}
					function copyText4Dg3g5(text){
						var tempInput = document.createElement('textarea');
						document.body.appendChild(tempInput);
						tempInput.innerHTML = text;
						tempInput.select();
						document.execCommand('copy');
						document.body.removeChild(tempInput);
						PluginUtilities.showToast(formatText4Dg3g5("${this.local.copied.replace(/"/g, '\\"')}", text), {type:"success"});
					}`;
		document.body.appendChild(insertedScript);
	}
	
	stop(){
		$('.container-2Rl01u').unbind('click');
		if(document.querySelector('.item-1GzJrl.da-item.l0c4lh057.showonclick')) $('.item-1GzJrl.da-item.l0c4lh057.showonclick').unbind('click');
		BdApi.clearCSS(this.getName());
		let tooltips = document.getElementsByClassName("l0c4lh057 popup outer");
		for (let i = 0; i < tooltips.length; i++) {
			tooltips[i].remove();
		}
		$(document).off('contextmenu.' + this.getName());
		this.stopInterval();
		if(document.getElementById('l0c4lh057 script copy')) document.getElementById('l0c4lh057 script copy').outerHTML = '';
		
		this.initialized = false;
	}
	stopInterval(){
		window.clearInterval(this.updateInformationTimer);
		this.updateInformationTimer = null;
	}
	onSwitch(){
		var self = this;
		$('.container-2Rl01u.da-container').unbind('click');
		$(".container-2Rl01u.da-container").click(function() {
			if(!document.getElementsByClassName('container-2Rl01u da-container popout-open')[0]){
				var exi = false;
				var checkExist = setInterval(function() {
					if ($('.popout-3sVMXz.da-popout.popoutBottom-1YbShG.popoutbottom').length) {
						if(exi){
							clearInterval(checkExist);
							var liste = document.getElementsByClassName('menu-Sp6bN1 da-menu')[0];
							var sep = document.createElement('div');
							sep.className = 'separator-2zcjq8 da-separator';
							liste.appendChild(sep);
							var itm = document.createElement('div');
							itm.className = 'item-1GzJrl da-item l0c4lh057 showonclick';
							itm.innerHTML = `<div class="icon-2doZ3q da-icon" style="background-image: url(&quot;/assets/50f8ef2cdb4e7697a4202fb9c6d0e1fc.svg&quot;);"></div><div class="label-1Y-LW5 da-label">${self.local.showGuildData}</div>`;
							liste.appendChild(itm);
							document.getElementsByClassName('popout-3sVMXz da-popout popoutBottom-1YbShG popoutbottom')[0].style.height = (document.getElementsByClassName('popout-3sVMXz da-popout popoutBottom-1YbShG popoutbottom')[0].offsetHeight + sep.offsetHeight + itm.offsetHeight) + 'px';
							document.getElementsByClassName('menu-Sp6bN1 da-menu')[0].style.height = (document.getElementsByClassName('menu-Sp6bN1 da-menu')[0].offsetHeight + sep.offsetHeight + itm.offsetHeight) + 'px';
							
							$(".item-1GzJrl.da-item.l0c4lh057.showonclick").click(function() {
								$(document.querySelector('.container-2Rl01u.popout-open')).click();
								self.getServer(PluginUtilities.getCurrentServer());
							});
						}
						exi = true;
					}
				}, 150);
			}
		});
		
		if(!PluginUtilities.isServer()) return;
		if(this.lastShownGuild == PluginUtilities.getCurrentServer().id) return;
		if(!this.settings.updateInformationOnGuildChange) return;
		if(!this.informationOfCurrentGuild) return;
		if(document.getElementById('l0c4lh057 popup outer').style.display == 'block') this.getServer(PluginUtilities.getCurrentServer());
		if(document.getElementById('l0c4lh057 popup user back')) document.getElementById('l0c4lh057 popup user back').outerHTML = '';
	}
	
	
	 
	
	
	
	getServer(guild){
		this.lastShownGuild = guild.id;
		if(PluginUtilities.isServer()) this.informationOfCurrentGuild = (PluginUtilities.getCurrentServer().id == guild.id); else this.informationOfCurrentGuild = false;
		
		document.getElementById('l0c4lh057 popup sChannelSearch').style.zIndex = '5';
		document.getElementById('l0c4lh057 popup channel permission').style.zIndex = '5';
		document.getElementById('l0c4lh057 popup role permission').style.zIndex = '5';
		document.getElementById('l0c4lh057 popup user information').style.zIndex = '5';
		document.getElementById('l0c4lh057 popup guild relations').style.zIndex = '0';
		document.getElementById('l0c4lh057 popup guild emojis').style.zIndex = '0';
		document.getElementById('l0c4lh057 popup guild emojiinfo').style.zIndex = '0';
		if(document.getElementById('l0c4lh057 popup user openChat')) document.getElementById('l0c4lh057 popup user openChat').style.zIndex = '0';
		
		this.stopInterval();
		
		DiscordModules.GuildActions.requestMembers(guild.id, '', 0);
		
		var popup = document.getElementById('l0c4lh057 popup guild information');
		document.getElementById('l0c4lh057 popup outer').style.display = 'block';
		
		var tableContent = `<h3 class="l0c4lh057" id="l0c4lh057 guild information title">${this.local.guildInfo.title}</h3><br>
		<div style="text-align:center;font-size:125%;font-weight:bold;";><p id="l0c4lh057 popup tocopy copyidguildname" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidguildname');" style="display: inline;">${guild.name}</p> (<p id="l0c4lh057 popup tocopy copyidguildid" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidguildid');" style="display: inline;">${guild.id}</p>)</div><br>`;
		if(guild.icon) tableContent += `<div style="width:25%;padding-top:25%;background-image:url('${this.getGuildIcon(guild)}');background-size:contain;margin-left:auto;margin-right:auto;background-repeat:no-repeat;" onclick="copyText4Dg3g5('${this.getGuildIcon(guild)}')"></div>`;
		tableContent += `<table class="l0c4lh057 popup user information table" style="width:100%;">
		<tr><td>${this.local.guildInfo.owner}:</td><td><p id="l0c4lh057 popup tocopy copyidownertag" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidownertag');" style="display: inline;">${this.userModule.getUser(guild.ownerId).tag}</p> (<p id="l0c4lh057 popup tocopy copyidownerid" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidownerid');" style="display: inline;">${guild.ownerId}</p>)</td></tr>
		<tr><td>${this.local.guildInfo.acronym}:</td><td>${guild.acronym}</td></tr>
		<tr><td>${this.local.guildInfo.createdAt}:</td><td><p id="l0c4lh057 popup tocopy copyidcreationdate" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidcreationdate');" style="display: inline;">${this.getSnowflakeCreationDate(guild.id).toLocaleString()}</p> (<p id="l0c4lh057 popup tocopy copyidcreationago" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidcreationago');" style="display: inline;">${this.formatText(this.local.guildInfo.daysAgo, [Math.round(Math.abs(this.getSnowflakeCreationDate(guild.id).getTime() - new Date().getTime()) / 8640000) / 10])}</p>)</td></tr>
		<tr><td>${this.local.guildInfo.joinedAt}:</td><td><p id="l0c4lh057 popup tocopy copyidjoineddate" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidjoineddate');" style="display: inline;">${guild.joinedAt.toLocaleString()}</p> (<p id="l0c4lh057 popup tocopy copyidjoinedago" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidjoinedago');" style="display: inline;">${this.formatText(this.local.guildInfo.daysAgo, [Math.round(Math.abs(guild.joinedAt.getTime() - new Date().getTime()) / 8640000) / 10])}</p>)</td></tr>
		<tr><td>${this.local.guildInfo.verificationLevel.title}:</td><td><p id="l0c4lh057 popup tocopy copyidverificationlevel" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidverificationlevel');" style="display: inline;">${guild.verificationLevel}</p> (<p id="l0c4lh057 popup tocopy copyidverificationleveldescription" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidverificationleveldescription');" style="display: inline;">${this.getVerificationLevel(guild.verificationLevel)}</p>)</td></tr>
		<tr><td>${this.local.guildInfo.explicitContentFilter.title}:</td><td><p id="l0c4lh057 popup tocopy copyidcontentfilter" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidcontentfilter');" style="display: inline;">${guild.explicitContentFilter}</p> (<p id="l0c4lh057 popup tocopy copyidcontentfilterdescription" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidcontentfilterdescription');" style="display: inline;">${this.getExplicitContentFilterLevel(guild.explicitContentFilter)}</p>)</td></tr>
		<tr><td>${this.local.guildInfo.defaultMessageNotifications.title}:</td><td><p id="l0c4lh057 popup tocopy copyidmessagenotifications" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidmessagenotifications');" style="display: inline;">${guild.defaultMessageNotifications}</p> (<p id="l0c4lh057 popup tocopy copyidmessagenotificationsdescription" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidmessagenotificationsdescription');" style="display: inline;">${this.getDefaultMessageNotifications(guild.defaultMessageNotifications)}</p>)</td></tr>
		<tr><td>${this.local.guildInfo.region}:</td><td><p id="l0c4lh057 popup tocopy copyidregion" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidregion');" style="display: inline;">${guild.region}</p></td></tr>`;
		tableContent += `<tr><td>${this.local.guildInfo.afkChannel.title}:</td><td>` + (guild.afkChannelId ? ('<p id="l0c4lh057 popup tocopy copyidafkchannel" onclick="copySelectedElement4Dg3g5(\'l0c4lh057 popup tocopy copyidafkchannel\');" style="display: inline;">' + this.channelModule.getChannel(guild.afkChannelId).name + '</p> ' + '(<p id="l0c4lh057 popup tocopy copyidafkchannelid" onclick="copySelectedElement4Dg3g5(\'l0c4lh057 popup tocopy copyidafkchannelid\');" style="display: inline;">' + guild.afkChannelId + '</p>)') : ('<p id="l0c4lh057 popup tocopy copyidNo afk channel" onclick="copySelectedElement4Dg3g5(\'l0c4lh057 popup tocopy copyidNo afk channel\');" style="display: inline;">' + this.local.guildInfo.afkChannel.noAfkChannel + '</p>')) + '</td></tr>';
		tableContent += `<tr><td>${this.local.guildInfo.afkTimeout.title}:</td><td><p id="l0c4lh057 popup tocopy copyidafktimeout" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidafktimeout');" style="display: inline;">${guild.afkTimeout} ${this.local.guildInfo.afkTimeout.unit}</p> (<p id="l0c4lh057 popup tocopy copyidafktimeoutminutes" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidafktimeoutminutes');" style="display: inline;">${guild.afkTimeout/60} ${this.local.time.long.minutes}</p>)</td></tr>`;
		if(guild.systemChannelId) tableContent += `<tr><td>${this.local.guildInfo.systemChannel.title}:</td><td class="l0c4lh057 popup guildinfo systemchannel showsystemchannel ${guild.systemChannelId}">${this.channelModule.getChannel(guild.systemChannelId)} (${guild.systemChannelId})</td></tr>`; else tableContent += `<tr><td>${this.local.guildInfo.systemChannel.title}:</td><td><p id="l0c4lh057 popup tocopy copyidnosystemchannel" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidnosystemchannel');" style="display: inline;">${this.local.guildInfo.systemChannel.noSystemChannel}</p></td></tr>`;
		tableContent += `<tr><td>${this.local.guildInfo.title}:</td><td class="l0c4lh057 popup guildinfo emojicount">${this.formatText(this.local.emojis.value, [this.emojiUtils.getGuildEmoji(guild.id).length])}</td></tr>
		<tr><td>${this.local.guildInfo.memberCount.title}:</td><td><p id="l0c4lh057 popup tocopy copyidmembercount" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidmembercount');" style="display: inline;">${this.formatText(this.local.guildInfo.memberCount.value, [this.memberModule.getMembers(guild.id).length])}</p></td></tr>
		<tr><td>${this.local.guildInfo.channelCount.title}:</td><td><p id="l0c4lh057 popup tocopy copyidchannelcount" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelcount');" style="display: inline;">${this.formatText(this.local.guildInfo.channelCount.value, [Array.filter(Object.values(this.channelModule.getChannels()), c => c.guild_id == guild.id).length])}</p></td></tr>
		<tr><td>${this.local.guildInfo.roleCount.title}:</td><td><p id="l0c4lh057 popup tocopy copyidrolecount" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidrolecount');" style="display: inline;">${this.formatText(this.local.guildInfo.roleCount.value, [Object.keys(guild.roles).length])}</p></td></tr>`;
		if(Array.from(guild.features).length > 0){
			var features = "";
			guild.features.forEach(v => features += v + ', ');
			features = features.substring(0, features.length - 2);
			tableContent += `<tr><td>${this.local.guildInfo.features}:</td><td>${features}</td></tr>`;
		}
		tableContent += `<tr><td>${this.local.guildInfo.relationships.friends.title}:</td><td id="l0c4lh057 popup guild relationships friends" class="l0c4lh057 popup guild relationships friends">${this.formatText(this.local.guildInfo.relationships.friends.value, [this.getGuildFriends(guild.id).length])}</td></tr>`;
		tableContent += `<tr><td>${this.local.guildInfo.relationships.blocked.title}:</td><td id="l0c4lh057 popup guild relationships blocked" class="l0c4lh057 popup guild relationships blocked">${this.formatText(this.local.guildInfo.relationships.blocked.value, [this.getGuildBlocked(guild.id).length])}</td></tr>`;
		tableContent = tableContent + `</table>`;
		popup.innerHTML = tableContent;
		
		var channelSearch = document.getElementById('l0c4lh057 popup channelSearch');
		channelSearch.innerHTML = `<h3 class="l0c4lh057">${this.local.channelInfo.title}</h3><br>`;
		var channels = Array.filter(Object.values(this.channelModule.getChannels()), c => c.guild_id == guild.id);
		var self = this;
		var channelsSortedC = {};
		var channelsSortedVT = {};
		for(const channel of channels){
			if(!channel.parent_id){
				channelsSortedC[channel.position] = channel;
			}else{
				if(!channelsSortedVT[channel.parent_id]) channelsSortedVT[channel.parent_id] = {};
				channelsSortedVT[channel.parent_id][channel.position] = channel;
			}
		}
		for(const v of Object.keys(channelsSortedC)){
			const channel = channelsSortedC[v];
			channelSearch.innerHTML += `<div id="l0c4lh057 popup channel collection ${channel.id}"><div class="l0c4lh057 popup channel single ${channel.id}">${this.getChannelIcon(channel.type, channel.nsfw)}${channel.name}</div></div>`;
		}
		for(const v1 of Object.keys(channelsSortedVT)){
			for(const v2 of Object.keys(channelsSortedVT[v1])){
				const channel = channelsSortedVT[v1][v2];
				if(document.getElementById("l0c4lh057 popup channel collection " + channel.parent_id)) document.getElementById("l0c4lh057 popup channel collection " + channel.parent_id).innerHTML += `<div id="l0c4lh057 popup channel collection ${channel.id}" style="margin-left:20px;"><div class="l0c4lh057 popup channel single ${channel.id}">${this.getChannelIcon(channel.type, channel.nsfw)}${channel.name}</div></div>`;
			}
		}
		for(const channel of channels){
			$(".l0c4lh057.popup.channel.single." + channel.id).click(function() {
				self.showSingleChannelInformation(channel, guild);
			});
		}
		
		var roleSearch = document.getElementById('l0c4lh057 popup roleSearch');
		roleSearch.innerHTML = `<h3 class="l0c4lh057">${this.local.roleInfo.title}</h3><br>`;
		var roleString = "";
		var toAdd = "<div>";
		for(const rId of Object.keys(guild.roles)){
			const role = guild.roles[rId];
			toAdd += `<div id="l0c4lh057 role ${rId}" class="l0c4lh057 popup role ${rId}">${role.name} (${rId})</div>`;
			roleString += `${role.name} (${rId})\n`;
		}
		roleSearch.innerHTML += toAdd + '</div>';
		
		if(document.getElementById('l0c4lh057 popup roles copybtn')) document.getElementById('l0c4lh057 popup roles copybtn').outerHTML = '';
		var copyRoles = document.createElement('button');
		copyRoles.id = 'l0c4lh057 popup roles copybtn';
		copyRoles.onclick = function(){copyText4Dg3g5(roleString.substring(roleString, roleString.length - 1));}
		copyRoles.innerHTML = this.local.roleInfo.copy;
		copyRoles.style.position = 'absolute';
		copyRoles.style.bottom = '5px';
		copyRoles.style.right = '5px';
		copyRoles.style.backgroundColor = '#444';
		copyRoles.style.color = 'lightgray';
		document.getElementById('l0c4lh057 popup roleContainer').appendChild(copyRoles);
		for(const rId of Object.keys(guild.roles)){
			const role = guild.roles[rId];
			$(".l0c4lh057.popup.role." + rId).click(function(){
				self.showRolePermissionInformation(role);
			});
		}
		
		$(".l0c4lh057.popup.guild.relationships.friends").click(function(){
			self.showRelations(guild, "friends");
		});
		$(".l0c4lh057.popup.guild.relationships.blocked").click(function(){
			self.showRelations(guild, "blocked");
		});
		$(".l0c4lh057.popup.guildinfo.emojicount").click(function(){
			self.showGuildEmojis(guild);
		});
		if(guild.systemChannelId) $(`.l0c4lh057.popup.guildinfo.systemchannel.showsystemchannel.${guild.systemChannelId}`).click(function(){
			self.showSingleChannelInformation(Array.filter(Object.values(channels), c => c.id == guild.systemChannelId)[0], guild);
		});
		
		this.showUsers(guild, '');
	}
	
	showGuildEmojis(guild){
		var self = this;
		var ge = document.getElementById('l0c4lh057 popup guild emojis');
		ge.style.zIndex = '10';
		var emojis = this.emojiUtils.getGuildEmoji(guild.id);
		var c = `<h3 class="l0c4lh057" id="l0c4lh057 guild title">${this.local.guildInfo.title}</h3><br><div style="text-align:center;font-size:125%;font-weight:bold;">${this.local.emojis.title}</div><br><div>`;
		if(this.settings.emojiScale < 6)
			for(const e of emojis){
				c += `<div class="l0c4lh057 popup guildinfo gEmoji ${e.id}" style="margin-bottom:3px;position:relative;"><img class="emoji" src="${e.url}" style="width:${this.settings.emojiScale * 1.45}em;height:${this.settings.emojiScale * 1.45}em;"><div style="margin-left:5px;display:inline;position:absolute;padding-top:calc(${this.settings.emojiScale}/2 * 1.45em - 0.5em);">${e.name} (${e.id})</div></div>`;
			}
		else{
			const colCount = 4;
			for(const e of emojis){
				c += `<img class="emoji l0c4lh057 popup guildinfo gEmoji ${e.id}" src="${e.url}" style="margin-left:0px;margin-right:5px;margin-bottom:5px;width:calc(${100 / colCount}% - 5px);height:calc(${100 / colCount}% - 5px);">`;
			}
		}
		ge.innerHTML = c + '</div>';
		
		for(const e of emojis)
			$(`.l0c4lh057.popup.guildinfo.gEmoji.${e.id}`).click(function(){
				self.showGuildEmoji(guild, e);
			});
		
		var geBack = document.createElement('div');
		geBack.style.position = 'absolute';
		geBack.style.top = '6px';
		geBack.style.right = '6px';
		geBack.style.fontWeight = 'bold';
		geBack.style.color = 'red';
		geBack.style.cursor = 'default';
		geBack.style.fontSize = '150%';
		geBack.innerHTML = 'X';
		geBack.onclick = function(){document.getElementById('l0c4lh057 popup guild emojis').style.zIndex = '0';}
		ge.appendChild(geBack);
	}
	
	showGuildEmoji(guild, emoji){
		var self = this;
		var ge = document.getElementById('l0c4lh057 popup guild emojiinfo');
		ge.style.zIndex = '15';
		
		var c = `<h3 class="l0c4lh057" id="l0c4lh057 guild title">${this.local.guildInfo.title}</h3><br><div style="text-align:center;font-size:125%;font-weight:bold;">${this.local.emojis.title}<br><p id="l0c4lh057 popup tocopy copyidemojiname" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidemojiname');" style="display: inline;">${emoji.name}</p> (<p id="l0c4lh057 popup tocopy copyidemojiid" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidemojiid');" style="display: inline;">${emoji.id}</p>)</div><br>`;
		if(emoji.url) c += `<div style="width:25%;padding-top:25%;background-image:url('${emoji.url}');margin-left:auto;margin-right:auto;background-repeat:no-repeat;background-size:contain;" onclick="copyText4Dg3g5('${emoji.url}');"></div>`;
		c += `<table class="l0c4lh057 popup emojiinfo table" style="width:100%;">
		<tr><td>${this.local.emojis.animated}:</td><td>${emoji.animated}</td></tr>
		<tr><td>${this.local.emojis.managed}:</td><td>${emoji.managed}</td></tr>
		<tr><td>${this.local.emojis.requireColons}:</td><td>${emoji.require_colons}</td></tr>`;
		
		if(emoji.roles.length > 0){
			c += `<tr><td>${this.local.emojis.whitelist}:</td><td>`;
			for(const r of emoji.roles){
				let role = guild.roles[r];
				c += `<div class="l0c4lh057 popup gEmoji ${emoji.id} role ${r}">${role.name} (${r})</div>`;
			}
			c += "</td></tr>";
		}
		
		ge.innerHTML = c + '</table>';
		
		for(const r of emoji.roles){
			let role = guild.roles[r];
			$(`.l0c4lh057.popup.gEmoji.${emoji.id}.role.${r}`).click(function(){
				self.showRolePermissionInformation(role);
			});
		}
		
		var geBack = document.createElement('div');
		geBack.style.position = 'absolute';
		geBack.style.top = '6px';
		geBack.style.right = '6px';
		geBack.style.fontWeight = 'bold';
		geBack.style.color = 'red';
		geBack.style.cursor = 'default';
		geBack.style.fontSize = '150%';
		geBack.innerHTML = 'X';
		geBack.onclick = function(){document.getElementById('l0c4lh057 popup guild emojiinfo').style.zIndex = '0';}
		ge.appendChild(geBack);
	}
	
	getGuildFriends(guildId){
		var relationships = this.relationshipStore.getRelationships();
		var guildFriends = [];
		for(const userId in relationships){
			const gMember = DiscordModules.GuildMemberStore.getMember(guildId, userId);
			if(gMember){
				const gUser = this.userModule.getUser(userId);
				if(relationships[userId] == 1)
					guildFriends.push(gUser);
			}
		}
		return guildFriends;
	}
	getGuildBlocked(guildId){
		var relationships = this.relationshipStore.getRelationships();
		var guildBlocked = [];
		for(const userId in relationships){
			const gMember = DiscordModules.GuildMemberStore.getMember(guildId, userId);
			if(gMember){
				const gUser = this.userModule.getUser(userId);
				if(relationships[userId] == 2)
					guildBlocked.push(gUser);
			}
		}
		return guildBlocked;
	}
	
	showRelations(guild, type){
		var self = this;
		var gr = document.getElementById('l0c4lh057 popup guild relations');
		gr.style.zIndex = '10';
		var c = `<h3 class="l0c4lh057" id="l0c4lh057 guild information title">${this.local.guildInfo.title}</h3><br><div style="text-align:center;font-size:125%;font-weight:bold;">${this.local.guildInfo.relationships[type].title}</div><br><div>`;
		if(type == "friends"){
			var users = this.getGuildFriends(guild.id);
			for(const u of users)
				c += `<div class="l0c4lh057 popup guildinfo relations ${u.id}">${u.tag} (${u.id})</div>`;
			if(users.length == 0)
				c += `<div>${this.local.guildInfo.relationships[type].noUsers}</div>`;
			gr.innerHTML = c + '</div>';
			for(const u of users)
				$(`.l0c4lh057.popup.guildinfo.relations.${u.id}`).click(function(){
					self.stopInterval();
					self.showUserInformation(guild, u, self.memberModule.getMember(guild.id, u.id));
				});
		}
		else if(type == "blocked"){
			var users = this.getGuildBlocked(guild.id);
			for(const u of users)
				c += `<div class="l0c4lh057 popup guildinfo relations ${u.id}">${u.tag} (${u.id})</div>`;
			if(users.length == 0)
				c += `<div>${this.local.guildInfo.relationships[type].noUsers}</div>`;
			gr.innerHTML = c + '</div>';
			for(const u of users)
				$(`.l0c4lh057.popup.guildinfo.relations.${u.id}`).click(function(){
					self.stopInterval();
					self.showUserInformation(guild, u, self.memberModule.getMember(guild.id, u.id));
				});
		}
		
		var grBack = document.createElement('div');
		grBack.style.position = 'absolute';
		grBack.style.top = '6px';
		grBack.style.right = '6px';
		grBack.style.fontWeight = 'bold';
		grBack.style.color = 'red';
		grBack.style.cursor = 'default';
		grBack.style.fontSize = '150%';
		grBack.innerHTML = 'X';
		grBack.onclick = function(){document.getElementById('l0c4lh057 popup guild relations').style.zIndex = '0';}
		gr.appendChild(grBack);
	}
	
	showSingleChannelInformation(channel, guild){
		var self = this;
		var scs = document.getElementById('l0c4lh057 popup sChannelSearch');
		scs.style.zIndex = '15';
		scs.innerHTML = `<h3 class="l0c4lh057">${this.local.channelInfo.title}</h3><br><div style="text-align:center;font-size:125%;font-weight:bold;"><p id="l0c4lh057 popup tocopy copyidchannelname" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelname');" style="display: inline;">${channel.name}</p> (<p id="l0c4lh057 popup tocopy copyidchannelid" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelid');" style="display: inline;">${channel.id}</p>)</div><br><table>
		<tr><td>${this.local.channelInfo.channelType.title}:</td><td><p id="l0c4lh057 popup tocopy copyidchanneltype" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchanneltype');" style="display: inline;">${channel.type}</p> (<p id="l0c4lh057 popup tocopy copyidchanneltypedescription" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchanneltypedescription');" style="display: inline;">${this.getChannelType(channel.type)}</p>)</td></tr>
		<tr><td>${this.local.channelInfo.topic}:</td><td><p id="l0c4lh057 popup tocopy copyidchanneltopic" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchanneltopic');" style="display: inline;">${channel.topic}</p></td></tr>
		<tr><td>${this.local.channelInfo.position}:</td><td><p id="l0c4lh057 popup tocopy copyidchannelposition" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelposition');" style="display: inline;">${channel.position}</p></td></tr>
		<tr><td>${this.local.channelInfo.userLimit}:</td><td><p id="l0c4lh057 popup tocopy copyiduserlimit" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyiduserlimit');" style="display: inline;">${channel.userLimit}</p></td></tr>
		<tr><td>${this.local.channelInfo.nsfw}:</td><td><p id="l0c4lh057 popup tocopy copyidisnsfw" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidisnsfw');" style="display: inline;">${channel.nsfw}</p></td></tr>
		<tr><td>${this.local.channelInfo.bitrate}:</td><td><p id="l0c4lh057 popup tocopy copyidchannelbitrate" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelbitrate');" style="display: inline;">${channel.bitrate}</p></td></tr>
		<tr><td>${this.local.channelInfo.slowmode.title}:</td><td><p id="l0c4lh057 popup tocopy copyidchannelslowmode" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelslowmode');" style="display: inline;">${this.formatText(this.local.channelInfo.slowmode.value, [channel.rateLimitPerUser])}</p></td></tr></table><br>`;
		var permOverwr = Object.values(channel.permissionOverwrites);
		for(const perm of permOverwr){
			var c = `<div id="l0c4lh057 popup channel permission ${perm.id}" class="l0c4lh057 popup channel permission ${perm.id}">${this.getPermissionType(perm.type)}: `;
			if(perm.type == "member") c += `${this.userModule.getUser(perm.id).tag}`; else if(perm.type == "role") c += `${guild.roles[perm.id].name}`;
			c += ` (${perm.id})</div>`;
			scs.innerHTML += c;
		}
		for(const perm of permOverwr){
			$(".l0c4lh057.popup.channel.permission." + perm.id).click(function() {
				self.showChannelPermissionInformation(perm, guild, channel);
			});
		}
		
		var sCsBack = document.createElement('div');
		sCsBack.style.position = 'absolute';
		sCsBack.style.top = '6px';
		sCsBack.style.right = '6px';
		sCsBack.style.fontWeight = 'bold';
		sCsBack.style.color = 'red';
		sCsBack.style.cursor = 'default';
		sCsBack.style.fontSize = '150%';
		sCsBack.innerHTML = 'X';
		sCsBack.onclick = function(){document.getElementById('l0c4lh057 popup sChannelSearch').style.zIndex = '5';}
		scs.appendChild(sCsBack);
		
		var uiOpenChat = document.createElement('button');
		uiOpenChat.className = 'l0c4lh057 popup channel openChat ' + channel.id + ' type' + channel.type;
		uiOpenChat.style.position = 'absolute';
		uiOpenChat.style.bottom = '5px';
		uiOpenChat.style.right = '5px';
		if(channel.type == 0) uiOpenChat.innerHTML = this.local.channelInfo.openChat; else if(channel.type == 2) uiOpenChat.innerHTML = this.local.channelInfo.connect;
		uiOpenChat.style.width = '20%';
		uiOpenChat.style.backgroundColor = '#444';
		if(channel.type == 2 || channel.type == 0) scs.appendChild(uiOpenChat);
		
		$('.l0c4lh057.popup.channel.openChat.' + channel.id + '.type' + channel.type).click(function(){
			self.stopInterval();
			if(this.className.endsWith('type0'))
				self.channelSelector.selectChannel(guild.id, channel.id);
			else if(this.className.endsWith('type2'))
				self.channelActions.selectVoiceChannel(guild.id, channel.id);
			document.getElementById('l0c4lh057 popup outer').style.display = 'none';
		});
	}
	
	showChannelPermissionInformation(perm, guild, channel){
		var cp = document.getElementById('l0c4lh057 popup channel permission');
		cp.style.zIndex = '20';
		cp.innerHTML = `<h3 class="l0c4lh057">${this.local.channelInfo.title}</h3><br>`;
		if(perm.type == "member") cp.innerHTML += `<div style="text-align:center;font-size:125%;font-weight:bold;">${this.local.channelInfo.channel}: ${channel.name}<br><p id="l0c4lh057 popup tocopy copyidchannelpermusertag" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermusertag');" style="display: inline;">${this.userModule.getUser(perm.id).tag}</p> (<p id="l0c4lh057 popup tocopy copyidchannelpermuserid" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermuserid');" style="display: inline;">${perm.id}</p>)</div>`; else if(perm.type == "role") cp.innerHTML += `<div style="text-align:center;font-size:125%;font-weight:bold;">${this.local.channelInfo.channel}: ${channel.name}<br><p id="l0c4lh057 popup tocopy copyidchannelpermrolename" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermrolename');" style="display: inline;">${guild.roles[perm.id].name}</p> (<p id="l0c4lh057 popup tocopy copyidchannelpermroleid" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermroleid');" style="display: inline;">${perm.id}</p>)</div>`;
		cp.innerHTML += `<br><table>
		<tr><td>${this.local.channelInfo.permissions.type}:</td><td><p id="l0c4lh057 popup tocopy copyidchannelpermtype" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermtype');" style="display: inline;">${this.local.channelInfo[perm.type]}</p></td></tr>
		<tr><td>${this.local.channelInfo.permissions.allow}:</td><td><p id="l0c4lh057 popup tocopy copyidchannelpermallowed" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermallowed');" style="display: inline;">${perm.allow}</p></td></tr>
		<tr><td></td><td><p id="l0c4lh057 popup tocopy copyidchannelpermalloweddescription" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermalloweddescription');" style="display: inline;">${this.getPermissionsFromBase16(perm.allow)}</p></td></tr>
		<tr><td>${this.local.channelInfo.permissions.deny}:</td><td><p id="l0c4lh057 popup tocopy copyidchannelpermdenied" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermdenied');" style="display: inline;">${perm.deny}</p></td></tr>
		<tr><td></td><td><p id="l0c4lh057 popup tocopy copyidchannelpermdenieddescription" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidchannelpermdenieddescription');" style="display: inline;">${this.getPermissionsFromBase16(perm.deny)}</p></td></tr></table>`;
		
		var cpBack = document.createElement('div');
		cpBack.style.position = 'absolute';
		cpBack.style.top = '6px';
		cpBack.style.right = '6px';
		cpBack.style.fontWeight = 'bold';
		cpBack.style.color = 'red';
		cpBack.style.cursor = 'default';
		cpBack.style.fontSize = '150%';
		cpBack.innerHTML = 'X';
		cpBack.onclick = function(){document.getElementById('l0c4lh057 popup channel permission').style.zIndex = '5';}
		cp.appendChild(cpBack);
	}
	
	showRolePermissionInformation(role){
		var rp = document.getElementById('l0c4lh057 popup role permission');
		rp.style.zIndex = '15';
		var c = `<h3 class="l0c4lh057">${this.local.roleInfo.title}</h3><br><div style="text-align:center;font-size:125%;font-weight:bold;"><p id="l0c4lh057 popup tocopy copyidrolename" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidrolename');" style="display: inline;">${role.name}</p> (<p id="l0c4lh057 popup tocopy copyidroleid" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidroleid');" style="display: inline;">${role.id}</p>)</div><br><table>
		<tr><td>${this.local.permissions.title}:</td><td><p id="l0c4lh057 popup tocopy copyidrolepermissions" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidrolepermissions');" style="display: inline;">${role.permissions}</p></td></tr>
		<tr><td></td><td><p id="l0c4lh057 popup tocopy copyidrolepermissionsdescription" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidrolepermissionsdescription');" style="display: inline;">${this.getPermissionsFromBase16(role.permissions)}</p></td></tr>
		<tr><td>${this.local.permissions.notAllowed}:</td><td><p id="l0c4lh057 popup tocopy copyidroledenied" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidroledenied');" style="display: inline;">${this.getNotPermissionsFromBase16(role.permissions)}</p></td></tr>
		<tr><td>${this.local.roleInfo.mentionable}:</td><td><p id="l0c4lh057 popup tocopy copyidrolementionable" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidrolementionable');" style="display: inline;">${role.mentionable}</p></td></tr>`;
		if(role.colorString) c += `<tr><td>${this.local.roleInfo.color.title}:</td><td><p id="l0c4lh057 popup tocopy copyidrolecolor" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidrolecolor');" style="display: inline;">${role.colorString}</p> <p style="display:inline;color:${role.colorString}">(${this.local.roleInfo.color.example})</p></td></tr>`; else c += `<tr><td>${this.local.roleInfo.color.title}:</td><td><p id="l0c4lh057 popup tocopy copyidnorolecolor" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidnorolecolor');" style="display: inline;">${this.local.roleInfo.color.noColor}</p></td></tr>`;
		c += `
		<tr><td>${this.local.roleInfo.hoist}:</td><td><p id="l0c4lh057 popup tocopy copyidrolehoist" onclick="copySelectedElement4Dg3g5('l0c4lh057 popup tocopy copyidrolehoist');" style="display: inline;">${role.hoist}</p></td></table>`
		rp.innerHTML = c;
		
		var rpBack = document.createElement('div');
		rpBack.style.position = 'absolute';
		rpBack.style.top = '6px';
		rpBack.style.right = '6px';
		rpBack.style.fontWeight = 'bold';
		rpBack.style.color = 'red';
		rpBack.style.cursor = 'default';
		rpBack.style.fontSize = '150%';
		rpBack.innerHTML = 'X';
		rpBack.onclick = function(){document.getElementById('l0c4lh057 popup role permission').style.zIndex = '5';}
		rp.appendChild(rpBack);
	}
	
	get perms(){
		return {
			1073741824: this.local.permissions.manageEmojis,
			536870912: this.local.permissions.manageWebhooks,
			268435456: this.local.permissions.manageRoles,
			134217728: this.local.permissions.manageNicknames,
			67108864: this.local.permissions.changeNickname,
			33554432: this.local.permissions.useVoiceActivity,
			16777216: this.local.permissions.moveMembers,
			8388608: this.local.permissions.deafenMembers,
			4194304: this.local.permissions.muteMembers,
			2097152: this.local.permissions.speak,
			1048576: this.local.permissions.connect,
			262144: this.local.permissions.useExternalEmojis,
			131072: this.local.permissions.mentionEveryone,
			65536: this.local.permissions.readMessageHistory,
			32768: this.local.permissions.attachFiles,
			16384: this.local.permissions.embedLinks,
			8192: this.local.permissions.manageMessages,
			4096: this.local.permissions.sendTtsMessages,
			2048: this.local.permissions.sendMessages,
			1024: this.local.permissions.viewChannelReadMessages,
			256: this.local.permissions.prioritySpeaker,
			128: this.local.permissions.viewAuditLog,
			64: this.local.permissions.addReactions,
			32: this.local.permissions.manageServer,
			16: this.local.permissions.manageChannels,
			8: this.local.permissions.administrator,
			4: this.local.permissions.banMembers,
			2: this.local.permissions.kickMembers,
			1: this.local.permissions.createInstantInvite
		}
	};
	
	getPermissionsFromBase16(base16){
		var b16 = base16;
		var p = [];
		for(var i = Object.keys(this.perms).length - 1; i > -1 ; i--){
			var numb = Object.keys(this.perms)[i];
			if(base16 >= numb){
				base16 -= numb;
				p.push(this.perms[numb]);
			}
		}
		if(base16 == 0) return p.join(", "); else return "Invalid permissions: " + b16;
	}
	getNotPermissionsFromBase16(base16){
		var b16 = base16;
		var p = [];
		for(var i = Object.keys(this.perms).length - 1; i > -1 ; i--){
			var numb = Object.keys(this.perms)[i];
			if(base16 >= numb){
				base16 -= numb;
			}else{
				p.push(this.perms[numb]);
			}
		}
		if(base16 == 0) return p.join(", "); else return "Invalid permissions: " + b16;
	}
	
	showUsers(guild, searchString){
		searchString = searchString.toLowerCase();
		var self = this;
		var members = this.memberModule.getMembers(guild.id);
		var users = [];
		var membersFound = [];
		
		var userSearch = document.getElementById('l0c4lh057 popup userSearch');
		userSearch.innerHTML = `<h3 class="l0c4lh057">${this.local.userInfo.title}</h3><br>`;
		
		var popupInput = document.createElement('input');
		popupInput.className = 'l0c4lh057 popup';
		popupInput.id = 'l0c4lh057 popup input';
		popupInput.style.position = 'absolute';
		popupInput.style.left = '5px';
		popupInput.style.width = '75%';
		popupInput.style.backgroundColor = '#4a4c52';
		popupInput.style.color = 'white';
		userSearch.appendChild(popupInput);
		
		var popupSearchBtn = document.createElement('button');
		popupSearchBtn.innerHTML = this.local.userInfo.searchUser;
		popupSearchBtn.className = 'l0c4lh057 popup user searchbtn';
		popupSearchBtn.style.position = 'absolute';
		popupSearchBtn.style.right = '5px';
		popupSearchBtn.style.width = 'calc(25% - 20px)';
		popupSearchBtn.style.backgroundColor = '#444';
		popupSearchBtn.style.height = popupInput.offsetHeight + 'px';
		userSearch.appendChild(popupSearchBtn);
		
		if(searchString.length < 1)
			membersFound = members;
		else{
			for(const member of members){
				if(this.userModule.getUser(member.userId).tag.toLowerCase().includes(searchString) || this.getNickname(member.nick).toLowerCase().includes(searchString)) membersFound.push(member);
			}
		}
		
		userSearch.innerHTML += `<br><br>${this.formatText(this.local.userInfo.usersFound, [membersFound.length, searchString])}<br><br>`;
		if(membersFound.length > this.settings.maxUsersShown)
			userSearch.innerHTML += `<div>${this.formatText(this.local.userInfo.tooManyUsers, [membersFound.length])}</div>`;
		else{
			for(const member of membersFound){
				const user = this.userModule.getUser(member.userId);
				userSearch.innerHTML += `<div class="l0c4lh057 popup user ${user.id}">${user.tag} (${user.id})</div>`;
			}
		}
		
		if(membersFound.length <= this.settings.maxUsersShown) for(const member of membersFound){
			$(".l0c4lh057.popup.user." + member.userId).click(function() {
				self.showUserInformation(guild, self.userModule.getUser(member.userId), member);
			});
		}
		$(".l0c4lh057.popup.user.searchbtn").click(function() {
			self.showUsers(guild, document.getElementById('l0c4lh057 popup input').value);
		});
		document.getElementById('l0c4lh057 popup input').value = searchString;
	}
	
	getNickname(nick){
		if(nick) return nick;
		return "";
	}
	
	showUserInformation(guild, user, member){
		var self = this;
		var ui = document.getElementById('l0c4lh057 popup user information');
		ui.style.zIndex = '15';
		var activity = this.UserMetaStore.getPrimaryActivity(user.id);
		
		if(!this.updateInformationTimer){
			var c = `<h3 class="l0c4lh057">${this.local.userInfo.title}</h3><br><div style="text-align:center;font-size:125%;font-weight:bold;">${user.tag} (${user.id})</div><div id="l0c4lh057 popup user information avatar" style="width:64px;height:64px;background-repeat:no-repeat;background-size:contain;position:absolute;right:5px;margin-top:5px;background-image:url('${this.getUserAvatarURL(user.id, 64, false)}')"></div><br><table id="l0c4lh057 popup user information table" style="margin-bottom:10px;">`
			if(member.nick) c += `<tr><td id="l0c4lh057 user information table nicknameTitle">${this.local.userInfo.nickname}:</td><td id="l0c4lh057 user information table nickname">${member.nick}</td></tr>`; else c += `<tr><td id="l0c4lh057 user information table nicknameTitle"></td><td id="l0c4lh057 user information table nickname"></td></tr>`;
			c += `<tr><td>${this.local.userInfo.color.title}:</td><td id="l0c4lh057 user information table color">${member.colorString} <div style="color:${member.colorString};display:inline;">(${this.local.userInfo.color.example})</div></td></tr>
			<tr><td>${this.local.userInfo.hoistRole.title}:</td><td id="l0c4lh057 user information table hoistrole">`;
			if(member.hoistRoleId) c += `${guild.roles[member.hoistRoleId].name} (${member.hoistRoleId})</td></tr>`; else c += `${this.local.userInfo.hoistRole.noHoistRole}</td></tr>`;
			c += `<tr><td>${this.local.userInfo.roles}:</td><td id="l0c4lh057 user information table roles">${this.getRolesOfMember(guild, member)}</td></tr>
			<tr><td>${this.local.userInfo.isBot}:</td><td>${user.bot}</td></tr>
			<tr><td>${this.local.userInfo.createdAt}:</td><td>${user.createdAt.toLocaleString()}</td></tr>
			<tr><td>${this.local.userInfo.status.title}:</td><td id="l0c4lh057 user information table status">${this.local.userInfo.status[this.UserMetaStore.getStatus(user.id)]}</td></tr>`;
			if(!activity) c += `<tr><td id="l0c4lh057 user information table activity1">${this.local.userInfo.activity.title}:</td><td id="l0c4lh057 user information table activity2">${this.local.userInfo.activity.noActivity}</td></tr>`;
			else c += `<tr><td id="l0c4lh057 user information table activity1"></td><td id="l0c4lh057 user information table activity2"></td></tr>`;
			
			c += `</table>`;
			ui.innerHTML = c;
			this.setProfilePicture(user.id, 64, 'l0c4lh057 popup user information avatar')
			
			var container = document.createElement('div');
			container.id = 'l0c4lh057 user information table activity';
			container.style.position = 'absolute';
			container.style.left = '3%';
			container.style.width = 'calc(94% - 15px)';
			container.style.height = 'auto';
			container.style.padding = '5px';
			container.style.borderRadius = '5px';
			container.style.border = '2px white solid';
			container.style.display = 'none';
			container.style.marginBottom = '25px';
			container.innerHTML = "";
			
			if(activity){
				container.style.display = 'initial';
				var aTitle = document.createElement('div');
				aTitle.className = 'headerTextNormal-2mGWX3 headerText-1HLrL7 marginBottom8-AtZOdT da-headerTextNormal da-headerText da-marginBottom8 small-29zrCQ size12-3R0845 height16-2Lv3qA weightBold-2yjlgw';
				aTitle.innerHTML = this.getActivityType(activity.type) + ' ' + activity.name;
				container.appendChild(aTitle);
				
				var largeImage = document.createElement('div');
				if(activity.assets){
					if(activity.assets.large_image){
						if(activity.application_id)
							largeImage.style.backgroundImage = 'url(https://cdn.discordapp.com/app-assets/' + activity.application_id + '/' + activity.assets.large_image + ')';
						else
							largeImage.style.backgroundImage = 'url(https://i.scdn.co/image/' + activity.assets.large_image.split(':')[1] + ')';
					}
				} else
					largeImage.style.backgroundImage = 'url("/assets/a5eba102f5b5e413df2b65c73f288afa.svg")';
				largeImage.style.backgroundRepeat = 'no-repeat';
				largeImage.style.backgroundSize = 'contain';
				largeImage.style.width = '64px';
				largeImage.style.height = '64px';
				largeImage.style.display = 'block';
				container.appendChild(largeImage);
					
				var addTimestamp = false;
				if(activity.timestamps) {
					if(activity.timestamps.end && activity.timestamps.start){
						var duration = activity.timestamps.end - activity.timestamps.start;
						var durationS = Math.round(duration / 1000);
						var progress = Date.now() - activity.timestamps.start;
						if(progress < 0) progress = 0;
						if(progress > duration) progress = duration;
						var progressS = Math.round(progress / 1000);
						var progressPercentage = Math.round(progress / duration * 1000) / 10;
						var aProgressBar = document.createElement('progress');
						aProgressBar.value = progress;
						aProgressBar.max = duration;
						aProgressBar.style.height = '4px';
						aProgressBar.style.position = 'relative';
						aProgressBar.style.width = '96%';
						aProgressBar.style.left = '2%';
						aProgressBar.style.borderRadius = '2px';
						container.appendChild(aProgressBar);
						var aProgress = document.createElement('div');
						aProgress.style.left = '2%';
						aProgress.style.position = 'relative';
						aProgress.style.display = 'inline';
						aProgress.innerHTML = this.getDurationOfSeconds(progressS);
						container.appendChild(aProgress);
						var aDuration = document.createElement('div');
						aDuration.style.right = '3%';
						aDuration.style.position = 'absolute';
						aDuration.style.display = 'inline';
						aDuration.innerHTML = this.getDurationOfSeconds(durationS);
						container.appendChild(aDuration);
					} else if(activity.timestamps.start)
						addTimestamp = true;
				}
				
				var iContainer = document.createElement('div');
				iContainer.style.top = '28px';
				iContainer.style.position = 'absolute';
				iContainer.style.left = '74px';
				iContainer.style.width = 'calc(100% - 70px)';
				container.appendChild(iContainer);
				
				if(activity.details){
					var aDetails = document.createElement('div');
					aDetails.style.fontWeight = 'bold';
					aDetails.style.left = '0px';
					aDetails.style.top = '0px';
					aDetails.style.width = '100%';
					aDetails.style.position = 'relative';
					aDetails.style.marginBottom = '4px';
					aDetails.innerHTML = activity.details;
					iContainer.appendChild(aDetails);
				}
				if(activity.state){
					var aState = document.createElement('div');
					aState.style.left = '0px';
					aState.style.top = '0px';
					aState.style.width = '100%';
					aState.style.position = 'relative';
					aState.style.marginBottom = '4px';
					aState.innerHTML = activity.state;
					
					if(activity.party){
						if(activity.party.size){
							if(activity.party.size[0] && activity.party.size[1]){
								aState.innerHTML += ` (${activity.party.size[0]}/${activity.party.size[1]})`;
							}
						}
					}
					
					iContainer.appendChild(aState);
				}
				if(activity.assets) if(activity.assets.large_text){
					var aLText = document.createElement('div');
					aLText.style.left = '0px';
					aLText.style.top = '0px';
					aLText.style.width = '100%';
					aLText.style.position = 'relative';
					aLText.style.marginBottom = '4px';
					aLText.innerHTML = activity.assets.large_text;
					iContainer.appendChild(aLText);
				}
				if(addTimestamp){
					var progress = Date.now() - activity.timestamps.start;
					if(progress < 0) progress = 0;
					var progressS = Math.round(progress / 1000);
					var aTimestamp = document.createElement('div');
					aTimestamp.style.left = '0px';
					aTimestamp.style.top = '0px';
					aTimestamp.style.width = '100%';
					aTimestamp.style.position = 'relative';
					aTimestamp.style.marginBottom = '4px';
					aTimestamp.innerHTML = this.formatText(this.local.userInfo.activity.for, this.getDurationOfSeconds(progressS, 'long'));
					iContainer.appendChild(aTimestamp);
				}
			}
			ui.appendChild(container);
		
			if(document.getElementById('l0c4lh057 popup user openChat')) document.getElementById('l0c4lh057 popup user openChat').outerHTML = '';
			var uiOpenChat = document.createElement('button');
			uiOpenChat.className = 'l0c4lh057 popup user openChat ' + user.id;
			uiOpenChat.id = 'l0c4lh057 popup user openChat';
			uiOpenChat.style.position = 'absolute';
			uiOpenChat.style.bottom = '5px';
			uiOpenChat.style.right = '5px';
			uiOpenChat.innerHTML = this.local.userInfo.openChat;
			uiOpenChat.style.width = '20%';
			uiOpenChat.style.backgroundColor = '#444';
			uiOpenChat.style.zIndex = '20';
			if(user == this.userModule.getCurrentUser()) uiOpenChat.style.display = 'none';
			document.getElementById('l0c4lh057 popup userContainer').appendChild(uiOpenChat);
				
			/* automatically update user information once per second, disable for editing */
			if(!this.updateInformationTimer) this.updateInformationTimer = window.setInterval(function(){self.showUserInformation(guild, user, member);}, 1000);
			
			if(!document.getElementById('l0c4lh057 popup user back')){
				var uiBack = document.createElement('div');
				uiBack.className = 'l0c4lh057 popup user back';
				uiBack.id = 'l0c4lh057 popup user back';
				uiBack.style.position = 'absolute';
				uiBack.style.top = '6px';
				uiBack.style.right = '6px';
				uiBack.style.fontWeight = 'bold';
				uiBack.style.color = 'red';
				uiBack.style.cursor = 'default';
				uiBack.style.fontSize = '150%';
				uiBack.style.zIndex = '999';
				uiBack.innerHTML = 'X';
				document.getElementById('l0c4lh057 popup userContainer').appendChild(uiBack);
			}else
				document.getElementById('l0c4lh057 popup user back').style.display = 'initial';
			
			$('.l0c4lh057.popup.user.openChat.' + user.id).click(function(){
				DiscordModules.PrivateChannelActions.ensurePrivateChannel(self.userModule.getCurrentUser().id, self.userModule.getUser(user.id).id).then(function(result){
					self.stopInterval();
					document.getElementById('l0c4lh057 popup user openChat').style.zIndex = '0';
					document.getElementById('l0c4lh057 popup outer').style.display = 'none';
					document.getElementById('l0c4lh057 popup guild relations').style.zIndex = '0';
					self.channelActions.selectPrivateChannel(self.channelModule.getDMFromUserId(user.id));
				});
			});
			$('.l0c4lh057.popup.user.back').click(function(){self.stopInterval(); document.getElementById('l0c4lh057 popup user information').style.zIndex = '5'; document.getElementById('l0c4lh057 popup user openChat').style.zIndex = '0'; document.getElementById('l0c4lh057 popup user back').style.display = 'none'});
			$('.l0c4lh057.popup.close').click(function(){self.stopInterval();});
		}else{
			if(member.nick){document.getElementById('l0c4lh057 user information table nicknameTitle').innerHTML = `${this.local.userInfo.nickname}:`; document.getElementById('l0c4lh057 user information table nickname').innerHTML = `${member.nick}`;}
			else{document.getElementById('l0c4lh057 user information table nicknameTitle').innerHTML = ``; document.getElementById('l0c4lh057 user information table nickname').innerHTML = ``;}
			document.getElementById('l0c4lh057 user information table color').innerHTML = `${member.colorString} <div style="color:${member.colorString};display:inline;">(${this.local.userInfo.color.example})</div>`;
			if(member.hoistRoleId) document.getElementById('l0c4lh057 user information table hoistrole').innerHTML = `${guild.roles[member.hoistRoleId].name} (${member.hoistRoleId})`; else document.getElementById('l0c4lh057 user information table hoistrole').innerHTML = this.local.userInfo.hoistRole.noHoistRole;
			document.getElementById('l0c4lh057 user information table roles').innerHTML = `${this.getRolesOfMember(guild, member)}`;
			document.getElementById('l0c4lh057 user information table status').innerHTML = this.local.userInfo.status[this.UserMetaStore.getStatus(user.id)];
			if(activity){
				document.getElementById('l0c4lh057 user information table activity1').innerHTML = ``;
				document.getElementById('l0c4lh057 user information table activity2').innerHTML = ``;
				var container = document.getElementById('l0c4lh057 user information table activity');
				container.style.display = 'initial';
				container.innerHTML = "";
				
				var aTitle = document.createElement('div');
				aTitle.className = 'headerTextNormal-2mGWX3 headerText-1HLrL7 marginBottom8-AtZOdT da-headerTextNormal da-headerText da-marginBottom8 small-29zrCQ size12-3R0845 height16-2Lv3qA weightBold-2yjlgw';
				aTitle.innerHTML = this.getActivityType(activity.type) + ' ' + activity.name;
				container.appendChild(aTitle);
				
				
				var largeImage = document.createElement('div');
				if(activity.assets){
					if(activity.assets.large_image){
						if(activity.application_id)
							largeImage.style.backgroundImage = 'url(https://cdn.discordapp.com/app-assets/' + activity.application_id + '/' + activity.assets.large_image + ')';
						else
							largeImage.style.backgroundImage = 'url(https://i.scdn.co/image/' + activity.assets.large_image.split(':')[1] + ')';
					}
				} else
					largeImage.style.backgroundImage = 'url("/assets/a5eba102f5b5e413df2b65c73f288afa.svg")';
				largeImage.style.backgroundRepeat = 'no-repeat';
				largeImage.style.backgroundSize = 'contain';
				largeImage.style.width = '64px';
				largeImage.style.height = '64px';
				largeImage.style.display = 'block';
				container.appendChild(largeImage);
					
				var addTimestamp = false;
				if(activity.timestamps) {
					if(activity.timestamps.end && activity.timestamps.start){
						var duration = activity.timestamps.end - activity.timestamps.start;
						var durationS = Math.round(duration / 1000);
						var progress = Date.now() - activity.timestamps.start;
						if(progress < 0) progress = 0;
						if(progress > duration) progress = duration;
						var progressS = Math.round(progress / 1000);
						var progressPercentage = Math.round(progress / duration * 1000) / 10;
						var aProgressBar = document.createElement('progress');
						aProgressBar.value = progress;
						aProgressBar.max = duration;
						aProgressBar.style.height = '4px';
						aProgressBar.style.position = 'relative';
						aProgressBar.style.width = '96%';
						aProgressBar.style.left = '2%';
						aProgressBar.style.borderRadius = '2px';
						container.appendChild(aProgressBar);
						var aProgress = document.createElement('div');
						aProgress.style.left = '2%';
						aProgress.style.position = 'relative';
						aProgress.style.display = 'inline';
						aProgress.innerHTML = this.getDurationOfSeconds(progressS);
						container.appendChild(aProgress);
						var aDuration = document.createElement('div');
						aDuration.style.right = '3%';
						aDuration.style.position = 'absolute';
						aDuration.style.display = 'inline';
						aDuration.innerHTML = this.getDurationOfSeconds(durationS);
						container.appendChild(aDuration);
					} else if(activity.timestamps.start)
						addTimestamp = true;
				}
				
				var iContainer = document.createElement('div');
				iContainer.style.top = '28px';
				iContainer.style.position = 'absolute';
				iContainer.style.left = '74px';
				iContainer.style.width = 'calc(100% - 70px)';
				container.appendChild(iContainer);
				
				if(activity.details){
					var aDetails = document.createElement('div');
					aDetails.style.fontWeight = 'bold';
					aDetails.style.left = '0px';
					aDetails.style.top = '0px';
					aDetails.style.width = '100%';
					aDetails.style.position = 'relative';
					aDetails.style.marginBottom = '4px';
					aDetails.innerHTML = activity.details;
					iContainer.appendChild(aDetails);
				}
				if(activity.state){
					var aState = document.createElement('div');
					aState.style.left = '0px';
					aState.style.top = '0px';
					aState.style.width = '100%';
					aState.style.position = 'relative';
					aState.style.marginBottom = '4px';
					aState.innerHTML = activity.state;
					
					if(activity.party){
						if(activity.party.size){
							if(activity.party.size[0] && activity.party.size[1]){
								aState.innerHTML += ` (${activity.party.size[0]}/${activity.party.size[1]})`;
							}
						}
					}
					
					iContainer.appendChild(aState);
				}
				if(activity.assets) if(activity.assets.large_text){
					var aLText = document.createElement('div');
					aLText.style.left = '0px';
					aLText.style.top = '0px';
					aLText.style.width = '100%';
					aLText.style.position = 'relative';
					aLText.style.marginBottom = '4px';
					aLText.innerHTML = activity.assets.large_text;
					iContainer.appendChild(aLText);
				}
				if(addTimestamp){
					var progress = Date.now() - activity.timestamps.start;
					if(progress < 0) progress = 0;
					var progressS = Math.round(progress / 1000);
					var aTimestamp = document.createElement('div');
					aTimestamp.style.left = '0px';
					aTimestamp.style.top = '0px';
					aTimestamp.style.width = '100%';
					aTimestamp.style.position = 'relative';
					aTimestamp.style.marginBottom = '4px';
					aTimestamp.innerHTML = this.formatText(this.local.userInfo.activity.for, this.getDurationOfSeconds(progressS, 'long'));
					iContainer.appendChild(aTimestamp);
				}
			}else{
				document.getElementById('l0c4lh057 user information table activity1').innerHTML = `${this.local.userInfo.activity.title}:`;
				document.getElementById('l0c4lh057 user information table activity2').innerHTML = `${this.local.userInfo.activity.noActivity}`;
				document.getElementById('l0c4lh057 user information table activity').style.display = `none`;
			}
		}
	}
	
	getDurationOfSeconds(seconds, joinParam){
		if(typeof joinParam === 'undefined') joinParam = ':';
		var minutes = Math.floor(seconds / 60);
		seconds -= 60 * minutes;
		if(minutes > 59){
			var hours = Math.floor(minutes / 60);
			minutes -= 60 * hours;
			if(hours > 23){
				var days = Math.floor(hours / 24);
				hours -= 24 * days;
				if(joinParam == ':') return [days, ("0" + hours).slice(-2), ("0" + minutes).slice(-2), ("0" + seconds).slice(-2)].join(joinParam); else return days + `${this.local.time.short.days} ` + hours + `${this.local.time.short.hours} ` + minutes + `${this.local.time.short.minutes} ` + seconds + `${this.local.time.short.seconds}`;
			}
			if(joinParam == ':') return [hours, ("0" + minutes).slice(-2), ("0" + seconds).slice(-2)].join(joinParam); else return hours + `${this.local.time.short.hours} ` + minutes + `${this.local.time.short.minutes} ` + seconds + `${this.local.time.short.seconds}`;
		}
		if(joinParam == ':') return [minutes, ("0" + seconds).slice(-2)].join(joinParam); else return minutes + `${this.local.time.short.minutes} ` + seconds + `${this.local.time.short.seconds}`;
	}
	
	getActivityType(type){
		if(type == 0) return this.local.userInfo.activity.playing; else if(type == 1) return this.local.userInfo.activity.streaming; else if(type == 2) return this.local.userInfo.activity.listening; else if(type == 3) return this.local.userInfo.activity.watching;
		return type;
	}
	
	getRolesOfMember(guild, member){
		var roles = "";
		for(const roleId of member.roles){
			roles += guild.roles[roleId].name + " (" + roleId + ")<br>";
		}
		if(roles.length > 4) roles = roles.substring(0, roles.length - 4);
		return roles;
	}
	
	getChannelType(type){
		if(type==0)
			return this.local.channelInfo.channelType.textChannel;
		else if(type==2)
			return this.local.channelInfo.channelType.voiceChannel;
		else if(type==4)
			return this.local.channelInfo.channelType.category;
		return "Unregistered channel type"
	}
	getPermissionType(type){
		return this.local.channelInfo[type];
	}
	getChannelIcon(type, isNsfw = false){
		if(type==0){
			if(isNsfw) return `<svg style="display:inline;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="colorDefaultText-oas-QM icon-sxakjD da-colorDefaultText da-icon"><path class="foreground-2W-aJk da-foreground" fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z" transform="translate(1.333 2)"></path><path class="foreground-2W-aJk da-foreground" fill="currentColor" fill-rule="nonzero" d="M9.75,8 L15.25,8 L15.25,8 C15.6642136,8 16,7.66421356 16,7.25 L16,6.71660919 L16,6.71660919 C16,6.57385832 15.9694372,6.43276186 15.9103665,6.30280625 L13.7664532,1.58619706 L13.7664532,1.58619706 C13.6041831,1.22920277 13.2482302,1 12.8560867,1 L12.1439133,1 L12.1439133,1 C11.7517698,1 11.3958169,1.22920277 11.2335468,1.58619706 L9.08963352,6.30280625 L9.08963352,6.30280625 C9.03056279,6.43276186 9,6.57385832 9,6.71660919 L9,7.25 L9,7.25 C9,7.66421356 9.33578644,8 9.75,8 Z M13,7 L12,7 L12,6 L13,6 L13,7 Z M13,4.96118197 L12,4.96118197 L12,3 L13,3 L13,4.96118197 Z"></path></svg>`;
			return `<svg style="display:inline;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="colorDefaultText-oas-QM icon-sxakjD da-colorDefaultText da-icon"><path class="foreground-2W-aJk da-foreground" fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z" transform="translate(1.333 2)"></path></svg>`;
		}else if(type==2)
			return `<svg name="Speaker" style="display:inline;" class="colorDefaultVoice-3wYlhb icon-sxakjD da-colorDefaultVoice da-icon" background="background-2OVjk_ da-background" width="16" height="16" viewBox="0 0 16 16"><path class="foreground-2W-aJk da-foreground" fill="currentColor" d="M9.33333333,2 L9.33333333,3.37333333 C11.26,3.94666667 12.6666667,5.73333333 12.6666667,7.84666667 C12.6666667,9.96 11.26,11.74 9.33333333,12.3133333 L9.33333333,13.6933333 C12,13.0866667 14,10.7 14,7.84666667 C14,4.99333333 12,2.60666667 9.33333333,2 L9.33333333,2 Z M11,7.84666667 C11,6.66666667 10.3333333,5.65333333 9.33333333,5.16 L9.33333333,10.5133333 C10.3333333,10.04 11,9.02 11,7.84666667 L11,7.84666667 Z M2,5.84666667 L2,9.84666667 L4.66666667,9.84666667 L8,13.18 L8,2.51333333 L4.66666667,5.84666667 L2,5.84666667 L2,5.84666667 Z"></path></svg>`;
		else if(type==4)
			return `<svg style="display:inline;position:inherit;" class="iconDefault-3Gr8d2 da-iconDefault iconTransition-2pOJ7l da-iconTransition directionDown-26e7eE" width="20" height="12" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 10L12 15 17 10"></path></svg>`;
		return `Unregistered channel type`;
	}
	
	getVerificationLevel(level){
		if(level == 0)
			return this.local.guildInfo.verificationLevel.unrestricted;
		if(level == 1)
			return this.local.guildInfo.verificationLevel.verifiedEmail;
		if(level == 2)
			return this.local.guildInfo.verificationLevel.registered;
		if(level == 3)
			return this.local.guildInfo.verificationLevel.member;
		if(level == 4)
			return this.local.guildInfo.verificationLevel.verifiedPhoneNumber;
	}
	
	getDefaultMessageNotifications(defMesNot){
		if(defMesNot == 0) return this.local.guildInfo.defaultMessageNotifications.allMessages; else if(defMesNot == 1) return this.local.guildInfo.defaultMessageNotifications.mentionsOnly;
		return "Invalid";
	}
	
	getExplicitContentFilterLevel(level){
		if(level == 0) return this.local.guildInfo.explicitContentFilter.disabled; else if(level == 1) return this.local.guildInfo.explicitContentFilter.membersWithoutRole; else if(level == 2) return this.local.guildInfo.explicitContentFilter.allMessages;
		return "Invalid";
	}
	
	getUserAvatarURL(eA=DiscordModules.UserStore.getCurrentUser().id, size=64, asGif=false){
		eA=typeof eA=='number'?eA['toFixed']():eA;
		var eB=DiscordModules.UserStore;
		var eC=DiscordModules.ImageResolver;
		var eD=eB['getUser'](eA);
		var eE=eC['getUserAvatarURL'](eD)['split']('?size')[0x0];
		var eF=eE.substring(0, eE.length - 4) + 'gif';
		if(asGif) return eF + '?size=' + size;
		return eE + '?size=' + size;
	}
	
	setProfilePicture(userId, size, elementId) {
		var self = this;
		$.ajax({
			url:self.getUserAvatarURL(userId, size, true),
			error: function(){
				if(document.getElementById(elementId)){
					document.getElementById(elementId).style.backgroundImage = 'url("' + self.getUserAvatarURL(userId, size, false) + '")';
					document.getElementById(elementId).onclick = function(){copyText4Dg3g5(`${self.getUserAvatarURL(userId, size, false)}`)};
				}
			},
			success: function(){
				if(document.getElementById(elementId)){
					document.getElementById(elementId).style.backgroundImage = 'url("' + self.getUserAvatarURL(userId, size, true) + '")';
					document.getElementById(elementId).onclick = function(){copyText4Dg3g5(`${self.getUserAvatarURL(userId, size, true)}`)};
				}
			}
		});
	}
	
	getGuildIcon(guild){
		return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	saveSettings() {
		PluginUtilities.saveSettings(this.getName(), this.settings);
	}
	loadSettings() {
		this.settings = PluginUtilities.loadSettings(this.getName(), this.defaultSettings);
	}
	
	formatText(source, params) {
		if(typeof params === "string") params = [params];
		$.each(params,function (i, n) {
			source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
		})
		return source;
	}
	
	
	
	
	
	
	
	
	alertText(e, t) {
		let a = $(`<div class="bd-modal-wrapper theme-dark" style="z-index:9999;">
						<div class="bd-backdrop backdrop-1wrmKB"></div>
						<div class="bd-modal modal-1UGdnR">
							<div class="bd-modal-inner inner-1JeGVc" style="width:auto;max-width:70%;max-height:100%;">
								<div class="header header-1R_AjF">
									<div class="title">${e}</div>
								</div>
								<div class="bd-modal-body">
									<div class="scroller-wrap fade">
										<div class="scroller">
											${t}
										</div>
									</div>
								</div>
								<div class="footer footer-2yfCgX">
									<button type="button">Okay</button>
								</div>
							</div>
						</div>
					</div>`);
		a.find(".footer button").on("click", () => {
			a.addClass("closing"), setTimeout(() => {
				a.remove()
			}, 300)
		}), a.find(".bd-backdrop").on("click", () => {
			a.addClass("closing"), setTimeout(() => {
				a.remove()
			}, 300)
		}), a.appendTo("#app-mount")
	}
	
	
	getSnowflakeCreationDate(id) {
		const epoch = 1420070400000;

		const toBinary = sf => {
			let binary = "",
				high = parseInt(sf.slice(0, -10)) || 0,
				low = parseInt(sf.slice(-10));

			while (low > 0 || high > 0) {
				binary = String(low & 1) + binary;

				low = Math.floor(low / 2);

				if (high > 0) {
					low += 5000000000 * (high % 2);
					high = Math.floor(high / 2);
				}
			}

			return binary;
		};

		return new Date(parseInt(toBinary(id).padStart(64).substring(0, 42), 2) + epoch);
	}
}
