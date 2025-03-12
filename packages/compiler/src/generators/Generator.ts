import type { Ast } from "../ast/Ast.js";

export interface Generator {
  generate(ast: Ast): string;
}
