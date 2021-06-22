import {Word} from "../lang/Word";

export type Lesson = {
  parts:LessonPart[];
}

export type LessonPart = {
  words:Word[];
}
