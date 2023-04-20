export interface ResponseFromDialogflow {
    responseId: string;
    queryResult: QueryResult;
    webhookStatus?: null;
    outputAudio: FieldsOrOutputAudio;
    outputAudioConfig?: null;
  }
  export interface QueryResult {
    fulfillmentMessages?: (FulfillmentMessagesEntity)[] | null;
    outputContexts?: (null)[] | null;
    queryText: string;
    speechRecognitionConfidence: number;
    action: string;
    parameters: Parameters;
    allRequiredParamsPresent: boolean;
    fulfillmentText: string;
    webhookSource: string;
    webhookPayload?: null;
    intent: Intent;
    intentDetectionConfidence: number;
    diagnosticInfo?: null;
    languageCode: string;
    sentimentAnalysisResult?: null;
    cancelsSlotFilling: boolean;
  }
  export interface FulfillmentMessagesEntity {
    platform: string;
    text?: Text | null;
    message: string;
    payload?: Payload | null;
  }
  export interface Text {
    text?: (string)[] | null;
  }
  export interface Payload {
    fields: Fields;
  }
  export interface Fields {
    richContent: RichContent;
  }
  export interface RichContent {
    listValue: ListValue;
    kind: string;
  }
  export interface ListValue {
    values?: (ValuesEntity)[] | null;
  }
  export interface ValuesEntity {
    listValue: ListValue1;
    kind: string;
  }
  export interface ListValue1 {
    values?: (ValuesEntity1)[] | null;
  }
  export interface ValuesEntity1 {
    structValue: StructValue;
    kind: string;
  }
  export interface StructValue {
    fields: Fields1;
  }
  export interface Fields1 {
    type: ColorOrTypeOrTextOrLink;
    text?: ColorOrTypeOrTextOrLink1 | null;
    icon?: Icon | null;
    link?: ColorOrTypeOrTextOrLink2 | null;
    options?: Options | null;
  }
  export interface ColorOrTypeOrTextOrLink {
    stringValue: string;
    kind: string;
  }
  export interface ColorOrTypeOrTextOrLink1 {
    stringValue: string;
    kind: string;
  }
  export interface Icon {
    structValue: StructValue1;
    kind: string;
  }
  export interface StructValue1 {
    fields: Fields2;
  }
  export interface Fields2 {
    color: ColorOrTypeOrTextOrLink;
    type: ColorOrTypeOrTextOrLink;
  }
  export interface ColorOrTypeOrTextOrLink2 {
    stringValue: string;
    kind: string;
  }
  export interface Options {
    listValue: ListValue2;
    kind: string;
  }
  export interface ListValue2 {
    values?: (ValuesEntity2)[] | null;
  }
  export interface ValuesEntity2 {
    structValue: StructValue2;
    kind: string;
  }
  export interface StructValue2 {
    fields: Fields3;
  }
  export interface Fields3 {
    text: ColorOrTypeOrTextOrLink;
  }
  export interface Parameters {
    fields: FieldsOrOutputAudio;
  }
  export interface FieldsOrOutputAudio {
  }
  export interface Intent {
    inputContextNames?: (null)[] | null;
    events?: (null)[] | null;
    trainingPhrases?: (null)[] | null;
    outputContexts?: (null)[] | null;
    parameters?: (null)[] | null;
    messages?: (null)[] | null;
    defaultResponsePlatforms?: (null)[] | null;
    followupIntentInfo?: (null)[] | null;
    name: string;
    displayName: string;
    priority: number;
    isFallback: boolean;
    webhookState: string;
    action: string;
    resetContexts: boolean;
    rootFollowupIntentName: string;
    parentFollowupIntentName: string;
    mlDisabled: boolean;
    liveAgentHandoff: boolean;
    endInteraction: boolean;
  }
  