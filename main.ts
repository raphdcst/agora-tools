import { App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface ATSettings {
	Setting: string;
}

const DEFAULT_SETTINGS: ATSettings = {
	Setting: 'default'
}

export default class AgoraTools extends Plugin {
	settings: ATSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'create-smiles',
			name: 'Create a SMILES code block',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('```smiles\n\n```');
			}
		});

		this.addCommand({
			id: 'create-qcm-temp',
			name: 'Create a QCM',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('### QCM 1 \n- [ ] A \n- [ ] B \n- [ ] C \n- [ ] D \n- [ ] E');
			}
		});

		this.addSettingTab(new ATSettingTab(this.app, this));

		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class ATSettingTab extends PluginSettingTab {
	plugin: AgoraTools;

	constructor(app: App, plugin: AgoraTools) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.Setting)
				.onChange(async (value) => {
					this.plugin.settings.Setting = value;
					await this.plugin.saveSettings();
				}));
	}
}
