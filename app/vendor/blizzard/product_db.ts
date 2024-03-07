/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum LanguageOption {
  LANGOPTION_NONE = 0,
  LANGOPTION_TEXT = 1,
  LANGOPTION_SPEECH = 2,
  LANGOPTION_TEXT_AND_SPEECH = 3,
  UNRECOGNIZED = -1,
}

export function languageOptionFromJSON(object: any): LanguageOption {
  switch (object) {
    case 0:
    case "LANGOPTION_NONE":
      return LanguageOption.LANGOPTION_NONE;
    case 1:
    case "LANGOPTION_TEXT":
      return LanguageOption.LANGOPTION_TEXT;
    case 2:
    case "LANGOPTION_SPEECH":
      return LanguageOption.LANGOPTION_SPEECH;
    case 3:
    case "LANGOPTION_TEXT_AND_SPEECH":
      return LanguageOption.LANGOPTION_TEXT_AND_SPEECH;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LanguageOption.UNRECOGNIZED;
  }
}

export function languageOptionToJSON(object: LanguageOption): string {
  switch (object) {
    case LanguageOption.LANGOPTION_NONE:
      return "LANGOPTION_NONE";
    case LanguageOption.LANGOPTION_TEXT:
      return "LANGOPTION_TEXT";
    case LanguageOption.LANGOPTION_SPEECH:
      return "LANGOPTION_SPEECH";
    case LanguageOption.LANGOPTION_TEXT_AND_SPEECH:
      return "LANGOPTION_TEXT_AND_SPEECH";
    case LanguageOption.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum LanguageSettingType {
  LANGSETTING_NONE = 0,
  LANGSETTING_SINGLE = 1,
  LANGSETTING_SIMPLE = 2,
  LANGSETTING_ADVANCED = 3,
  UNRECOGNIZED = -1,
}

export function languageSettingTypeFromJSON(object: any): LanguageSettingType {
  switch (object) {
    case 0:
    case "LANGSETTING_NONE":
      return LanguageSettingType.LANGSETTING_NONE;
    case 1:
    case "LANGSETTING_SINGLE":
      return LanguageSettingType.LANGSETTING_SINGLE;
    case 2:
    case "LANGSETTING_SIMPLE":
      return LanguageSettingType.LANGSETTING_SIMPLE;
    case 3:
    case "LANGSETTING_ADVANCED":
      return LanguageSettingType.LANGSETTING_ADVANCED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LanguageSettingType.UNRECOGNIZED;
  }
}

export function languageSettingTypeToJSON(object: LanguageSettingType): string {
  switch (object) {
    case LanguageSettingType.LANGSETTING_NONE:
      return "LANGSETTING_NONE";
    case LanguageSettingType.LANGSETTING_SINGLE:
      return "LANGSETTING_SINGLE";
    case LanguageSettingType.LANGSETTING_SIMPLE:
      return "LANGSETTING_SIMPLE";
    case LanguageSettingType.LANGSETTING_ADVANCED:
      return "LANGSETTING_ADVANCED";
    case LanguageSettingType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum ShortcutOption {
  SHORTCUT_NONE = 0,
  SHORTCUT_USER = 1,
  SHORTCUT_ALL_USERS = 2,
  UNRECOGNIZED = -1,
}

export function shortcutOptionFromJSON(object: any): ShortcutOption {
  switch (object) {
    case 0:
    case "SHORTCUT_NONE":
      return ShortcutOption.SHORTCUT_NONE;
    case 1:
    case "SHORTCUT_USER":
      return ShortcutOption.SHORTCUT_USER;
    case 2:
    case "SHORTCUT_ALL_USERS":
      return ShortcutOption.SHORTCUT_ALL_USERS;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ShortcutOption.UNRECOGNIZED;
  }
}

export function shortcutOptionToJSON(object: ShortcutOption): string {
  switch (object) {
    case ShortcutOption.SHORTCUT_NONE:
      return "SHORTCUT_NONE";
    case ShortcutOption.SHORTCUT_USER:
      return "SHORTCUT_USER";
    case ShortcutOption.SHORTCUT_ALL_USERS:
      return "SHORTCUT_ALL_USERS";
    case ShortcutOption.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum Operation {
  OP_UPDATE = 0,
  OP_BACKFILL = 1,
  OP_REPAIR = 2,
  OP_NONE = -1,
}

export function operationFromJSON(object: any): Operation {
  switch (object) {
    case 0:
    case "OP_UPDATE":
      return Operation.OP_UPDATE;
    case 1:
    case "OP_BACKFILL":
      return Operation.OP_BACKFILL;
    case 2:
    case "OP_REPAIR":
      return Operation.OP_REPAIR;
    case -1:
    case "OP_NONE":
      return Operation.OP_NONE;
    default:
      return Operation.OP_NONE;
  }
}

export function operationToJSON(object: Operation): string {
  switch (object) {
    case Operation.OP_UPDATE:
      return "OP_UPDATE";
    case Operation.OP_BACKFILL:
      return "OP_BACKFILL";
    case Operation.OP_REPAIR:
      return "OP_REPAIR";
    case Operation.OP_NONE:
      return "OP_NONE";
    default:
      return "OP_NONE";
  }
}

export interface LanguageSetting {
  language: string;
  option: LanguageOption;
}

export interface UserSettings {
  installPath: string;
  playRegion: string;
  desktopShortcut: ShortcutOption;
  startmenuShortcut: ShortcutOption;
  languageSettings: LanguageSettingType;
  selectedTextLanguage: string;
  selectedSpeechLanguage: string;
  languages: LanguageSetting[];
  gfxOverrideTags: string;
  versionbranch: string;
}

export interface InstallHandshake {
  product: string;
  uid: string;
  settings: UserSettings | undefined;
}

export interface BuildConfig {
  region: string;
  buildConfig: string;
}

export interface BaseProductState {
  installed: boolean;
  playable: boolean;
  updateComplete: boolean;
  backgroundDownloadAvailable: boolean;
  backgroundDownloadComplete: boolean;
  currentVersion: string;
  currentVersionStr: string;
  installedBuildConfig: BuildConfig[];
  backgroundDownloadBuildConfig: BuildConfig[];
  decryptionKey: string;
  completedInstallActions: string[];
}

export interface BackfillProgress {
  progress: number;
  backgrounddownload: boolean;
  paused: boolean;
  downloadLimit: bigint;
}

export interface RepairProgress {
  progress: number;
}

export interface UpdateProgress {
  lastDiscSetUsed: string;
  progress: number;
  discIgnored: boolean;
  totalToDownload: bigint;
  downloadRemaining: bigint;
}

export interface CachedProductState {
  baseProductState: BaseProductState | undefined;
  backfillProgress: BackfillProgress | undefined;
  repairProgress: RepairProgress | undefined;
  updateProgress: UpdateProgress | undefined;
}

export interface ProductOperations {
  activeOperation: Operation;
  priority: bigint;
}

export interface ProductInstall {
  uid: string;
  productCode: string;
  settings: UserSettings | undefined;
  cachedProductState: CachedProductState | undefined;
  productOperations: ProductOperations | undefined;
}

export interface ProductConfig {
  productCode: string;
  metadataHash: string;
  timestamp: string;
}

export interface ActiveProcess {
  processName: string;
  pid: number;
  uri: string[];
}

export interface DownloadSettings {
  downloadLimit: number;
  backfillLimit: number;
}

export interface ProductDb {
  productInstalls: ProductInstall[];
  activeInstalls: InstallHandshake[];
  activeProcesses: ActiveProcess[];
  productConfigs: ProductConfig[];
  downloadSettings: DownloadSettings | undefined;
}

function createBaseLanguageSetting(): LanguageSetting {
  return { language: "", option: 0 };
}

export const LanguageSetting = {
  encode(message: LanguageSetting, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.language !== "") {
      writer.uint32(10).string(message.language);
    }
    if (message.option !== 0) {
      writer.uint32(16).int32(message.option);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LanguageSetting {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLanguageSetting();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.language = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.option = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LanguageSetting {
    return {
      language: isSet(object.language) ? globalThis.String(object.language) : "",
      option: isSet(object.option) ? languageOptionFromJSON(object.option) : 0,
    };
  },

  toJSON(message: LanguageSetting): unknown {
    const obj: any = {};
    if (message.language !== "") {
      obj.language = message.language;
    }
    if (message.option !== 0) {
      obj.option = languageOptionToJSON(message.option);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LanguageSetting>, I>>(base?: I): LanguageSetting {
    return LanguageSetting.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LanguageSetting>, I>>(object: I): LanguageSetting {
    const message = createBaseLanguageSetting();
    message.language = object.language ?? "";
    message.option = object.option ?? 0;
    return message;
  },
};

function createBaseUserSettings(): UserSettings {
  return {
    installPath: "",
    playRegion: "",
    desktopShortcut: 0,
    startmenuShortcut: 0,
    languageSettings: 0,
    selectedTextLanguage: "",
    selectedSpeechLanguage: "",
    languages: [],
    gfxOverrideTags: "",
    versionbranch: "",
  };
}

export const UserSettings = {
  encode(message: UserSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.installPath !== "") {
      writer.uint32(10).string(message.installPath);
    }
    if (message.playRegion !== "") {
      writer.uint32(18).string(message.playRegion);
    }
    if (message.desktopShortcut !== 0) {
      writer.uint32(24).int32(message.desktopShortcut);
    }
    if (message.startmenuShortcut !== 0) {
      writer.uint32(32).int32(message.startmenuShortcut);
    }
    if (message.languageSettings !== 0) {
      writer.uint32(40).int32(message.languageSettings);
    }
    if (message.selectedTextLanguage !== "") {
      writer.uint32(50).string(message.selectedTextLanguage);
    }
    if (message.selectedSpeechLanguage !== "") {
      writer.uint32(58).string(message.selectedSpeechLanguage);
    }
    for (const v of message.languages) {
      LanguageSetting.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.gfxOverrideTags !== "") {
      writer.uint32(74).string(message.gfxOverrideTags);
    }
    if (message.versionbranch !== "") {
      writer.uint32(82).string(message.versionbranch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.installPath = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.playRegion = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.desktopShortcut = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.startmenuShortcut = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.languageSettings = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.selectedTextLanguage = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.selectedSpeechLanguage = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.languages.push(LanguageSetting.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.gfxOverrideTags = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.versionbranch = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserSettings {
    return {
      installPath: isSet(object.installPath) ? globalThis.String(object.installPath) : "",
      playRegion: isSet(object.playRegion) ? globalThis.String(object.playRegion) : "",
      desktopShortcut: isSet(object.desktopShortcut) ? shortcutOptionFromJSON(object.desktopShortcut) : 0,
      startmenuShortcut: isSet(object.startmenuShortcut) ? shortcutOptionFromJSON(object.startmenuShortcut) : 0,
      languageSettings: isSet(object.languageSettings) ? languageSettingTypeFromJSON(object.languageSettings) : 0,
      selectedTextLanguage: isSet(object.selectedTextLanguage) ? globalThis.String(object.selectedTextLanguage) : "",
      selectedSpeechLanguage: isSet(object.selectedSpeechLanguage)
        ? globalThis.String(object.selectedSpeechLanguage)
        : "",
      languages: globalThis.Array.isArray(object?.languages)
        ? object.languages.map((e: any) => LanguageSetting.fromJSON(e))
        : [],
      gfxOverrideTags: isSet(object.gfxOverrideTags) ? globalThis.String(object.gfxOverrideTags) : "",
      versionbranch: isSet(object.versionbranch) ? globalThis.String(object.versionbranch) : "",
    };
  },

  toJSON(message: UserSettings): unknown {
    const obj: any = {};
    if (message.installPath !== "") {
      obj.installPath = message.installPath;
    }
    if (message.playRegion !== "") {
      obj.playRegion = message.playRegion;
    }
    if (message.desktopShortcut !== 0) {
      obj.desktopShortcut = shortcutOptionToJSON(message.desktopShortcut);
    }
    if (message.startmenuShortcut !== 0) {
      obj.startmenuShortcut = shortcutOptionToJSON(message.startmenuShortcut);
    }
    if (message.languageSettings !== 0) {
      obj.languageSettings = languageSettingTypeToJSON(message.languageSettings);
    }
    if (message.selectedTextLanguage !== "") {
      obj.selectedTextLanguage = message.selectedTextLanguage;
    }
    if (message.selectedSpeechLanguage !== "") {
      obj.selectedSpeechLanguage = message.selectedSpeechLanguage;
    }
    if (message.languages?.length) {
      obj.languages = message.languages.map((e) => LanguageSetting.toJSON(e));
    }
    if (message.gfxOverrideTags !== "") {
      obj.gfxOverrideTags = message.gfxOverrideTags;
    }
    if (message.versionbranch !== "") {
      obj.versionbranch = message.versionbranch;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserSettings>, I>>(base?: I): UserSettings {
    return UserSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserSettings>, I>>(object: I): UserSettings {
    const message = createBaseUserSettings();
    message.installPath = object.installPath ?? "";
    message.playRegion = object.playRegion ?? "";
    message.desktopShortcut = object.desktopShortcut ?? 0;
    message.startmenuShortcut = object.startmenuShortcut ?? 0;
    message.languageSettings = object.languageSettings ?? 0;
    message.selectedTextLanguage = object.selectedTextLanguage ?? "";
    message.selectedSpeechLanguage = object.selectedSpeechLanguage ?? "";
    message.languages = object.languages?.map((e) => LanguageSetting.fromPartial(e)) || [];
    message.gfxOverrideTags = object.gfxOverrideTags ?? "";
    message.versionbranch = object.versionbranch ?? "";
    return message;
  },
};

function createBaseInstallHandshake(): InstallHandshake {
  return { product: "", uid: "", settings: undefined };
}

export const InstallHandshake = {
  encode(message: InstallHandshake, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.product !== "") {
      writer.uint32(10).string(message.product);
    }
    if (message.uid !== "") {
      writer.uint32(18).string(message.uid);
    }
    if (message.settings !== undefined) {
      UserSettings.encode(message.settings, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstallHandshake {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstallHandshake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.product = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.settings = UserSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): InstallHandshake {
    return {
      product: isSet(object.product) ? globalThis.String(object.product) : "",
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      settings: isSet(object.settings) ? UserSettings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: InstallHandshake): unknown {
    const obj: any = {};
    if (message.product !== "") {
      obj.product = message.product;
    }
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.settings !== undefined) {
      obj.settings = UserSettings.toJSON(message.settings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<InstallHandshake>, I>>(base?: I): InstallHandshake {
    return InstallHandshake.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<InstallHandshake>, I>>(object: I): InstallHandshake {
    const message = createBaseInstallHandshake();
    message.product = object.product ?? "";
    message.uid = object.uid ?? "";
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? UserSettings.fromPartial(object.settings)
      : undefined;
    return message;
  },
};

function createBaseBuildConfig(): BuildConfig {
  return { region: "", buildConfig: "" };
}

export const BuildConfig = {
  encode(message: BuildConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.region !== "") {
      writer.uint32(10).string(message.region);
    }
    if (message.buildConfig !== "") {
      writer.uint32(18).string(message.buildConfig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BuildConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuildConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.region = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.buildConfig = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BuildConfig {
    return {
      region: isSet(object.region) ? globalThis.String(object.region) : "",
      buildConfig: isSet(object.buildConfig) ? globalThis.String(object.buildConfig) : "",
    };
  },

  toJSON(message: BuildConfig): unknown {
    const obj: any = {};
    if (message.region !== "") {
      obj.region = message.region;
    }
    if (message.buildConfig !== "") {
      obj.buildConfig = message.buildConfig;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BuildConfig>, I>>(base?: I): BuildConfig {
    return BuildConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BuildConfig>, I>>(object: I): BuildConfig {
    const message = createBaseBuildConfig();
    message.region = object.region ?? "";
    message.buildConfig = object.buildConfig ?? "";
    return message;
  },
};

function createBaseBaseProductState(): BaseProductState {
  return {
    installed: false,
    playable: false,
    updateComplete: false,
    backgroundDownloadAvailable: false,
    backgroundDownloadComplete: false,
    currentVersion: "",
    currentVersionStr: "",
    installedBuildConfig: [],
    backgroundDownloadBuildConfig: [],
    decryptionKey: "",
    completedInstallActions: [],
  };
}

export const BaseProductState = {
  encode(message: BaseProductState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.installed === true) {
      writer.uint32(8).bool(message.installed);
    }
    if (message.playable === true) {
      writer.uint32(16).bool(message.playable);
    }
    if (message.updateComplete === true) {
      writer.uint32(24).bool(message.updateComplete);
    }
    if (message.backgroundDownloadAvailable === true) {
      writer.uint32(32).bool(message.backgroundDownloadAvailable);
    }
    if (message.backgroundDownloadComplete === true) {
      writer.uint32(40).bool(message.backgroundDownloadComplete);
    }
    if (message.currentVersion !== "") {
      writer.uint32(50).string(message.currentVersion);
    }
    if (message.currentVersionStr !== "") {
      writer.uint32(58).string(message.currentVersionStr);
    }
    for (const v of message.installedBuildConfig) {
      BuildConfig.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.backgroundDownloadBuildConfig) {
      BuildConfig.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    if (message.decryptionKey !== "") {
      writer.uint32(82).string(message.decryptionKey);
    }
    for (const v of message.completedInstallActions) {
      writer.uint32(90).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseProductState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseProductState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.installed = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.playable = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.updateComplete = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.backgroundDownloadAvailable = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.backgroundDownloadComplete = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.currentVersion = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.currentVersionStr = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.installedBuildConfig.push(BuildConfig.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.backgroundDownloadBuildConfig.push(BuildConfig.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.decryptionKey = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.completedInstallActions.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BaseProductState {
    return {
      installed: isSet(object.installed) ? globalThis.Boolean(object.installed) : false,
      playable: isSet(object.playable) ? globalThis.Boolean(object.playable) : false,
      updateComplete: isSet(object.updateComplete) ? globalThis.Boolean(object.updateComplete) : false,
      backgroundDownloadAvailable: isSet(object.backgroundDownloadAvailable)
        ? globalThis.Boolean(object.backgroundDownloadAvailable)
        : false,
      backgroundDownloadComplete: isSet(object.backgroundDownloadComplete)
        ? globalThis.Boolean(object.backgroundDownloadComplete)
        : false,
      currentVersion: isSet(object.currentVersion) ? globalThis.String(object.currentVersion) : "",
      currentVersionStr: isSet(object.currentVersionStr) ? globalThis.String(object.currentVersionStr) : "",
      installedBuildConfig: globalThis.Array.isArray(object?.installedBuildConfig)
        ? object.installedBuildConfig.map((e: any) => BuildConfig.fromJSON(e))
        : [],
      backgroundDownloadBuildConfig: globalThis.Array.isArray(object?.backgroundDownloadBuildConfig)
        ? object.backgroundDownloadBuildConfig.map((e: any) => BuildConfig.fromJSON(e))
        : [],
      decryptionKey: isSet(object.decryptionKey) ? globalThis.String(object.decryptionKey) : "",
      completedInstallActions: globalThis.Array.isArray(object?.completedInstallActions)
        ? object.completedInstallActions.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: BaseProductState): unknown {
    const obj: any = {};
    if (message.installed === true) {
      obj.installed = message.installed;
    }
    if (message.playable === true) {
      obj.playable = message.playable;
    }
    if (message.updateComplete === true) {
      obj.updateComplete = message.updateComplete;
    }
    if (message.backgroundDownloadAvailable === true) {
      obj.backgroundDownloadAvailable = message.backgroundDownloadAvailable;
    }
    if (message.backgroundDownloadComplete === true) {
      obj.backgroundDownloadComplete = message.backgroundDownloadComplete;
    }
    if (message.currentVersion !== "") {
      obj.currentVersion = message.currentVersion;
    }
    if (message.currentVersionStr !== "") {
      obj.currentVersionStr = message.currentVersionStr;
    }
    if (message.installedBuildConfig?.length) {
      obj.installedBuildConfig = message.installedBuildConfig.map((e) => BuildConfig.toJSON(e));
    }
    if (message.backgroundDownloadBuildConfig?.length) {
      obj.backgroundDownloadBuildConfig = message.backgroundDownloadBuildConfig.map((e) => BuildConfig.toJSON(e));
    }
    if (message.decryptionKey !== "") {
      obj.decryptionKey = message.decryptionKey;
    }
    if (message.completedInstallActions?.length) {
      obj.completedInstallActions = message.completedInstallActions;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BaseProductState>, I>>(base?: I): BaseProductState {
    return BaseProductState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BaseProductState>, I>>(object: I): BaseProductState {
    const message = createBaseBaseProductState();
    message.installed = object.installed ?? false;
    message.playable = object.playable ?? false;
    message.updateComplete = object.updateComplete ?? false;
    message.backgroundDownloadAvailable = object.backgroundDownloadAvailable ?? false;
    message.backgroundDownloadComplete = object.backgroundDownloadComplete ?? false;
    message.currentVersion = object.currentVersion ?? "";
    message.currentVersionStr = object.currentVersionStr ?? "";
    message.installedBuildConfig = object.installedBuildConfig?.map((e) => BuildConfig.fromPartial(e)) || [];
    message.backgroundDownloadBuildConfig =
      object.backgroundDownloadBuildConfig?.map((e) => BuildConfig.fromPartial(e)) || [];
    message.decryptionKey = object.decryptionKey ?? "";
    message.completedInstallActions = object.completedInstallActions?.map((e) => e) || [];
    return message;
  },
};

function createBaseBackfillProgress(): BackfillProgress {
  return { progress: 0, backgrounddownload: false, paused: false, downloadLimit: BigInt("0") };
}

export const BackfillProgress = {
  encode(message: BackfillProgress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.progress !== 0) {
      writer.uint32(9).double(message.progress);
    }
    if (message.backgrounddownload === true) {
      writer.uint32(16).bool(message.backgrounddownload);
    }
    if (message.paused === true) {
      writer.uint32(24).bool(message.paused);
    }
    if (message.downloadLimit !== BigInt("0")) {
      if (BigInt.asUintN(64, message.downloadLimit) !== message.downloadLimit) {
        throw new Error("value provided for field message.downloadLimit of type uint64 too large");
      }
      writer.uint32(32).uint64(message.downloadLimit.toString());
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BackfillProgress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBackfillProgress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.progress = reader.double();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.backgrounddownload = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.paused = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.downloadLimit = longToBigint(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BackfillProgress {
    return {
      progress: isSet(object.progress) ? globalThis.Number(object.progress) : 0,
      backgrounddownload: isSet(object.backgrounddownload) ? globalThis.Boolean(object.backgrounddownload) : false,
      paused: isSet(object.paused) ? globalThis.Boolean(object.paused) : false,
      downloadLimit: isSet(object.downloadLimit) ? BigInt(object.downloadLimit) : BigInt("0"),
    };
  },

  toJSON(message: BackfillProgress): unknown {
    const obj: any = {};
    if (message.progress !== 0) {
      obj.progress = message.progress;
    }
    if (message.backgrounddownload === true) {
      obj.backgrounddownload = message.backgrounddownload;
    }
    if (message.paused === true) {
      obj.paused = message.paused;
    }
    if (message.downloadLimit !== BigInt("0")) {
      obj.downloadLimit = message.downloadLimit.toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BackfillProgress>, I>>(base?: I): BackfillProgress {
    return BackfillProgress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BackfillProgress>, I>>(object: I): BackfillProgress {
    const message = createBaseBackfillProgress();
    message.progress = object.progress ?? 0;
    message.backgrounddownload = object.backgrounddownload ?? false;
    message.paused = object.paused ?? false;
    message.downloadLimit = object.downloadLimit ?? BigInt("0");
    return message;
  },
};

function createBaseRepairProgress(): RepairProgress {
  return { progress: 0 };
}

export const RepairProgress = {
  encode(message: RepairProgress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.progress !== 0) {
      writer.uint32(9).double(message.progress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RepairProgress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepairProgress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.progress = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RepairProgress {
    return { progress: isSet(object.progress) ? globalThis.Number(object.progress) : 0 };
  },

  toJSON(message: RepairProgress): unknown {
    const obj: any = {};
    if (message.progress !== 0) {
      obj.progress = message.progress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RepairProgress>, I>>(base?: I): RepairProgress {
    return RepairProgress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RepairProgress>, I>>(object: I): RepairProgress {
    const message = createBaseRepairProgress();
    message.progress = object.progress ?? 0;
    return message;
  },
};

function createBaseUpdateProgress(): UpdateProgress {
  return {
    lastDiscSetUsed: "",
    progress: 0,
    discIgnored: false,
    totalToDownload: BigInt("0"),
    downloadRemaining: BigInt("0"),
  };
}

export const UpdateProgress = {
  encode(message: UpdateProgress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastDiscSetUsed !== "") {
      writer.uint32(10).string(message.lastDiscSetUsed);
    }
    if (message.progress !== 0) {
      writer.uint32(17).double(message.progress);
    }
    if (message.discIgnored === true) {
      writer.uint32(24).bool(message.discIgnored);
    }
    if (message.totalToDownload !== BigInt("0")) {
      if (BigInt.asUintN(64, message.totalToDownload) !== message.totalToDownload) {
        throw new Error("value provided for field message.totalToDownload of type uint64 too large");
      }
      writer.uint32(32).uint64(message.totalToDownload.toString());
    }
    if (message.downloadRemaining !== BigInt("0")) {
      if (BigInt.asUintN(64, message.downloadRemaining) !== message.downloadRemaining) {
        throw new Error("value provided for field message.downloadRemaining of type uint64 too large");
      }
      writer.uint32(40).uint64(message.downloadRemaining.toString());
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateProgress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProgress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.lastDiscSetUsed = reader.string();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.progress = reader.double();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.discIgnored = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.totalToDownload = longToBigint(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.downloadRemaining = longToBigint(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UpdateProgress {
    return {
      lastDiscSetUsed: isSet(object.lastDiscSetUsed) ? globalThis.String(object.lastDiscSetUsed) : "",
      progress: isSet(object.progress) ? globalThis.Number(object.progress) : 0,
      discIgnored: isSet(object.discIgnored) ? globalThis.Boolean(object.discIgnored) : false,
      totalToDownload: isSet(object.totalToDownload) ? BigInt(object.totalToDownload) : BigInt("0"),
      downloadRemaining: isSet(object.downloadRemaining) ? BigInt(object.downloadRemaining) : BigInt("0"),
    };
  },

  toJSON(message: UpdateProgress): unknown {
    const obj: any = {};
    if (message.lastDiscSetUsed !== "") {
      obj.lastDiscSetUsed = message.lastDiscSetUsed;
    }
    if (message.progress !== 0) {
      obj.progress = message.progress;
    }
    if (message.discIgnored === true) {
      obj.discIgnored = message.discIgnored;
    }
    if (message.totalToDownload !== BigInt("0")) {
      obj.totalToDownload = message.totalToDownload.toString();
    }
    if (message.downloadRemaining !== BigInt("0")) {
      obj.downloadRemaining = message.downloadRemaining.toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateProgress>, I>>(base?: I): UpdateProgress {
    return UpdateProgress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateProgress>, I>>(object: I): UpdateProgress {
    const message = createBaseUpdateProgress();
    message.lastDiscSetUsed = object.lastDiscSetUsed ?? "";
    message.progress = object.progress ?? 0;
    message.discIgnored = object.discIgnored ?? false;
    message.totalToDownload = object.totalToDownload ?? BigInt("0");
    message.downloadRemaining = object.downloadRemaining ?? BigInt("0");
    return message;
  },
};

function createBaseCachedProductState(): CachedProductState {
  return {
    baseProductState: undefined,
    backfillProgress: undefined,
    repairProgress: undefined,
    updateProgress: undefined,
  };
}

export const CachedProductState = {
  encode(message: CachedProductState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.baseProductState !== undefined) {
      BaseProductState.encode(message.baseProductState, writer.uint32(10).fork()).ldelim();
    }
    if (message.backfillProgress !== undefined) {
      BackfillProgress.encode(message.backfillProgress, writer.uint32(18).fork()).ldelim();
    }
    if (message.repairProgress !== undefined) {
      RepairProgress.encode(message.repairProgress, writer.uint32(26).fork()).ldelim();
    }
    if (message.updateProgress !== undefined) {
      UpdateProgress.encode(message.updateProgress, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CachedProductState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCachedProductState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.baseProductState = BaseProductState.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.backfillProgress = BackfillProgress.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.repairProgress = RepairProgress.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.updateProgress = UpdateProgress.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CachedProductState {
    return {
      baseProductState: isSet(object.baseProductState) ? BaseProductState.fromJSON(object.baseProductState) : undefined,
      backfillProgress: isSet(object.backfillProgress) ? BackfillProgress.fromJSON(object.backfillProgress) : undefined,
      repairProgress: isSet(object.repairProgress) ? RepairProgress.fromJSON(object.repairProgress) : undefined,
      updateProgress: isSet(object.updateProgress) ? UpdateProgress.fromJSON(object.updateProgress) : undefined,
    };
  },

  toJSON(message: CachedProductState): unknown {
    const obj: any = {};
    if (message.baseProductState !== undefined) {
      obj.baseProductState = BaseProductState.toJSON(message.baseProductState);
    }
    if (message.backfillProgress !== undefined) {
      obj.backfillProgress = BackfillProgress.toJSON(message.backfillProgress);
    }
    if (message.repairProgress !== undefined) {
      obj.repairProgress = RepairProgress.toJSON(message.repairProgress);
    }
    if (message.updateProgress !== undefined) {
      obj.updateProgress = UpdateProgress.toJSON(message.updateProgress);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CachedProductState>, I>>(base?: I): CachedProductState {
    return CachedProductState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CachedProductState>, I>>(object: I): CachedProductState {
    const message = createBaseCachedProductState();
    message.baseProductState = (object.baseProductState !== undefined && object.baseProductState !== null)
      ? BaseProductState.fromPartial(object.baseProductState)
      : undefined;
    message.backfillProgress = (object.backfillProgress !== undefined && object.backfillProgress !== null)
      ? BackfillProgress.fromPartial(object.backfillProgress)
      : undefined;
    message.repairProgress = (object.repairProgress !== undefined && object.repairProgress !== null)
      ? RepairProgress.fromPartial(object.repairProgress)
      : undefined;
    message.updateProgress = (object.updateProgress !== undefined && object.updateProgress !== null)
      ? UpdateProgress.fromPartial(object.updateProgress)
      : undefined;
    return message;
  },
};

function createBaseProductOperations(): ProductOperations {
  return { activeOperation: 0, priority: BigInt("0") };
}

export const ProductOperations = {
  encode(message: ProductOperations, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.activeOperation !== 0) {
      writer.uint32(8).int32(message.activeOperation);
    }
    if (message.priority !== BigInt("0")) {
      if (BigInt.asUintN(64, message.priority) !== message.priority) {
        throw new Error("value provided for field message.priority of type uint64 too large");
      }
      writer.uint32(16).uint64(message.priority.toString());
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductOperations {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductOperations();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.activeOperation = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.priority = longToBigint(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProductOperations {
    return {
      activeOperation: isSet(object.activeOperation) ? operationFromJSON(object.activeOperation) : 0,
      priority: isSet(object.priority) ? BigInt(object.priority) : BigInt("0"),
    };
  },

  toJSON(message: ProductOperations): unknown {
    const obj: any = {};
    if (message.activeOperation !== 0) {
      obj.activeOperation = operationToJSON(message.activeOperation);
    }
    if (message.priority !== BigInt("0")) {
      obj.priority = message.priority.toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductOperations>, I>>(base?: I): ProductOperations {
    return ProductOperations.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductOperations>, I>>(object: I): ProductOperations {
    const message = createBaseProductOperations();
    message.activeOperation = object.activeOperation ?? 0;
    message.priority = object.priority ?? BigInt("0");
    return message;
  },
};

function createBaseProductInstall(): ProductInstall {
  return { uid: "", productCode: "", settings: undefined, cachedProductState: undefined, productOperations: undefined };
}

export const ProductInstall = {
  encode(message: ProductInstall, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== "") {
      writer.uint32(10).string(message.uid);
    }
    if (message.productCode !== "") {
      writer.uint32(18).string(message.productCode);
    }
    if (message.settings !== undefined) {
      UserSettings.encode(message.settings, writer.uint32(26).fork()).ldelim();
    }
    if (message.cachedProductState !== undefined) {
      CachedProductState.encode(message.cachedProductState, writer.uint32(34).fork()).ldelim();
    }
    if (message.productOperations !== undefined) {
      ProductOperations.encode(message.productOperations, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductInstall {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductInstall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.productCode = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.settings = UserSettings.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.cachedProductState = CachedProductState.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.productOperations = ProductOperations.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProductInstall {
    return {
      uid: isSet(object.uid) ? globalThis.String(object.uid) : "",
      productCode: isSet(object.productCode) ? globalThis.String(object.productCode) : "",
      settings: isSet(object.settings) ? UserSettings.fromJSON(object.settings) : undefined,
      cachedProductState: isSet(object.cachedProductState)
        ? CachedProductState.fromJSON(object.cachedProductState)
        : undefined,
      productOperations: isSet(object.productOperations)
        ? ProductOperations.fromJSON(object.productOperations)
        : undefined,
    };
  },

  toJSON(message: ProductInstall): unknown {
    const obj: any = {};
    if (message.uid !== "") {
      obj.uid = message.uid;
    }
    if (message.productCode !== "") {
      obj.productCode = message.productCode;
    }
    if (message.settings !== undefined) {
      obj.settings = UserSettings.toJSON(message.settings);
    }
    if (message.cachedProductState !== undefined) {
      obj.cachedProductState = CachedProductState.toJSON(message.cachedProductState);
    }
    if (message.productOperations !== undefined) {
      obj.productOperations = ProductOperations.toJSON(message.productOperations);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductInstall>, I>>(base?: I): ProductInstall {
    return ProductInstall.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductInstall>, I>>(object: I): ProductInstall {
    const message = createBaseProductInstall();
    message.uid = object.uid ?? "";
    message.productCode = object.productCode ?? "";
    message.settings = (object.settings !== undefined && object.settings !== null)
      ? UserSettings.fromPartial(object.settings)
      : undefined;
    message.cachedProductState = (object.cachedProductState !== undefined && object.cachedProductState !== null)
      ? CachedProductState.fromPartial(object.cachedProductState)
      : undefined;
    message.productOperations = (object.productOperations !== undefined && object.productOperations !== null)
      ? ProductOperations.fromPartial(object.productOperations)
      : undefined;
    return message;
  },
};

function createBaseProductConfig(): ProductConfig {
  return { productCode: "", metadataHash: "", timestamp: "" };
}

export const ProductConfig = {
  encode(message: ProductConfig, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.productCode !== "") {
      writer.uint32(10).string(message.productCode);
    }
    if (message.metadataHash !== "") {
      writer.uint32(18).string(message.metadataHash);
    }
    if (message.timestamp !== "") {
      writer.uint32(26).string(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductConfig {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductConfig();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.productCode = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.metadataHash = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.timestamp = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProductConfig {
    return {
      productCode: isSet(object.productCode) ? globalThis.String(object.productCode) : "",
      metadataHash: isSet(object.metadataHash) ? globalThis.String(object.metadataHash) : "",
      timestamp: isSet(object.timestamp) ? globalThis.String(object.timestamp) : "",
    };
  },

  toJSON(message: ProductConfig): unknown {
    const obj: any = {};
    if (message.productCode !== "") {
      obj.productCode = message.productCode;
    }
    if (message.metadataHash !== "") {
      obj.metadataHash = message.metadataHash;
    }
    if (message.timestamp !== "") {
      obj.timestamp = message.timestamp;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductConfig>, I>>(base?: I): ProductConfig {
    return ProductConfig.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductConfig>, I>>(object: I): ProductConfig {
    const message = createBaseProductConfig();
    message.productCode = object.productCode ?? "";
    message.metadataHash = object.metadataHash ?? "";
    message.timestamp = object.timestamp ?? "";
    return message;
  },
};

function createBaseActiveProcess(): ActiveProcess {
  return { processName: "", pid: 0, uri: [] };
}

export const ActiveProcess = {
  encode(message: ActiveProcess, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.processName !== "") {
      writer.uint32(10).string(message.processName);
    }
    if (message.pid !== 0) {
      writer.uint32(16).int32(message.pid);
    }
    for (const v of message.uri) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveProcess {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveProcess();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.processName = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.pid = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.uri.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ActiveProcess {
    return {
      processName: isSet(object.processName) ? globalThis.String(object.processName) : "",
      pid: isSet(object.pid) ? globalThis.Number(object.pid) : 0,
      uri: globalThis.Array.isArray(object?.uri) ? object.uri.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: ActiveProcess): unknown {
    const obj: any = {};
    if (message.processName !== "") {
      obj.processName = message.processName;
    }
    if (message.pid !== 0) {
      obj.pid = Math.round(message.pid);
    }
    if (message.uri?.length) {
      obj.uri = message.uri;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveProcess>, I>>(base?: I): ActiveProcess {
    return ActiveProcess.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ActiveProcess>, I>>(object: I): ActiveProcess {
    const message = createBaseActiveProcess();
    message.processName = object.processName ?? "";
    message.pid = object.pid ?? 0;
    message.uri = object.uri?.map((e) => e) || [];
    return message;
  },
};

function createBaseDownloadSettings(): DownloadSettings {
  return { downloadLimit: 0, backfillLimit: 0 };
}

export const DownloadSettings = {
  encode(message: DownloadSettings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.downloadLimit !== 0) {
      writer.uint32(8).int32(message.downloadLimit);
    }
    if (message.backfillLimit !== 0) {
      writer.uint32(16).int32(message.backfillLimit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DownloadSettings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDownloadSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.downloadLimit = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.backfillLimit = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DownloadSettings {
    return {
      downloadLimit: isSet(object.downloadLimit) ? globalThis.Number(object.downloadLimit) : 0,
      backfillLimit: isSet(object.backfillLimit) ? globalThis.Number(object.backfillLimit) : 0,
    };
  },

  toJSON(message: DownloadSettings): unknown {
    const obj: any = {};
    if (message.downloadLimit !== 0) {
      obj.downloadLimit = Math.round(message.downloadLimit);
    }
    if (message.backfillLimit !== 0) {
      obj.backfillLimit = Math.round(message.backfillLimit);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DownloadSettings>, I>>(base?: I): DownloadSettings {
    return DownloadSettings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DownloadSettings>, I>>(object: I): DownloadSettings {
    const message = createBaseDownloadSettings();
    message.downloadLimit = object.downloadLimit ?? 0;
    message.backfillLimit = object.backfillLimit ?? 0;
    return message;
  },
};

function createBaseProductDb(): ProductDb {
  return {
    productInstalls: [],
    activeInstalls: [],
    activeProcesses: [],
    productConfigs: [],
    downloadSettings: undefined,
  };
}

export const ProductDb = {
  encode(message: ProductDb, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.productInstalls) {
      ProductInstall.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.activeInstalls) {
      InstallHandshake.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.activeProcesses) {
      ActiveProcess.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.productConfigs) {
      ProductConfig.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.downloadSettings !== undefined) {
      DownloadSettings.encode(message.downloadSettings, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductDb {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductDb();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.productInstalls.push(ProductInstall.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.activeInstalls.push(InstallHandshake.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.activeProcesses.push(ActiveProcess.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.productConfigs.push(ProductConfig.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.downloadSettings = DownloadSettings.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProductDb {
    return {
      productInstalls: globalThis.Array.isArray(object?.productInstalls)
        ? object.productInstalls.map((e: any) => ProductInstall.fromJSON(e))
        : [],
      activeInstalls: globalThis.Array.isArray(object?.activeInstalls)
        ? object.activeInstalls.map((e: any) => InstallHandshake.fromJSON(e))
        : [],
      activeProcesses: globalThis.Array.isArray(object?.activeProcesses)
        ? object.activeProcesses.map((e: any) => ActiveProcess.fromJSON(e))
        : [],
      productConfigs: globalThis.Array.isArray(object?.productConfigs)
        ? object.productConfigs.map((e: any) => ProductConfig.fromJSON(e))
        : [],
      downloadSettings: isSet(object.downloadSettings) ? DownloadSettings.fromJSON(object.downloadSettings) : undefined,
    };
  },

  toJSON(message: ProductDb): unknown {
    const obj: any = {};
    if (message.productInstalls?.length) {
      obj.productInstalls = message.productInstalls.map((e) => ProductInstall.toJSON(e));
    }
    if (message.activeInstalls?.length) {
      obj.activeInstalls = message.activeInstalls.map((e) => InstallHandshake.toJSON(e));
    }
    if (message.activeProcesses?.length) {
      obj.activeProcesses = message.activeProcesses.map((e) => ActiveProcess.toJSON(e));
    }
    if (message.productConfigs?.length) {
      obj.productConfigs = message.productConfigs.map((e) => ProductConfig.toJSON(e));
    }
    if (message.downloadSettings !== undefined) {
      obj.downloadSettings = DownloadSettings.toJSON(message.downloadSettings);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductDb>, I>>(base?: I): ProductDb {
    return ProductDb.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductDb>, I>>(object: I): ProductDb {
    const message = createBaseProductDb();
    message.productInstalls = object.productInstalls?.map((e) => ProductInstall.fromPartial(e)) || [];
    message.activeInstalls = object.activeInstalls?.map((e) => InstallHandshake.fromPartial(e)) || [];
    message.activeProcesses = object.activeProcesses?.map((e) => ActiveProcess.fromPartial(e)) || [];
    message.productConfigs = object.productConfigs?.map((e) => ProductConfig.fromPartial(e)) || [];
    message.downloadSettings = (object.downloadSettings !== undefined && object.downloadSettings !== null)
      ? DownloadSettings.fromPartial(object.downloadSettings)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | bigint | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToBigint(long: Long) {
  return BigInt(long.toString());
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
