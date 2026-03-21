export enum EditorLang {
  cpp = "cpp",
  java = "java",
  javascript = "javascript"
}

export type GetBoilerplateSchema = {
  problemid: number,
  language: EditorLang,
}


export type TestRequestResponse = {
  submissionid: string;
};


export interface CodeEditorSchema {
  language: EditorLang;
  content: {
    problemid: number,
  };
}
export interface CodeSchema {
  language: EditorLang;
  content: string | "";
  editorRef: React.RefObject<any>;
}