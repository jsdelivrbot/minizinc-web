/*
 * Copy and paste this file in node_modules/brace/mode
 */

ace.define("ace/mode/mzn", ["require", "exports", "module", "ace/lib/oop", "ace/mode/mzn"], function (acequire, exports, module) {
  "use strict";
  var oop = acequire("../lib/oop");
  var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
  /* --------------------- START ----------------------------- */
  var MznHighlightRules = function () {
    this.$rules = {
      "start": [{
          "token": "comment",
          "regex": "(/\\*)",
          "push": "multi_line_comment__1"
        },
        {
          "token": "comment",
          "regex": "(%.*)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0o[0-7]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+(?:(?:.\\d+)?[Ee][-+]?\\d+|.\\d+))"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+)"
        },
        {
          "token": "string",
          "regex": "(\\\")",
          "push": "string__1"
        },
        {
          "token": "constant.language",
          "regex": "(\\b(?:true|false)\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\bnot\\b|<->|->|<-|\\\\/|\\bxor\\b|/\\\\)"
        },
        {
          "token": "keyword.operator",
          "regex": "(<|>|<=|>=|==|=|!=)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\+|-|\\*|/|\\bdiv\\b|\\bmod\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\b(?:in|subset|superset|union|diff|symdiff|intersect)\\b|\\.\\.)"
        },
        {
          "token": "punctuation",
          "regex": "(;)"
        },
        {
          "token": "punctuation",
          "regex": "(:)"
        },
        {
          "token": "punctuation",
          "regex": "(,)"
        },
        {
          "token": "punctuation",
          "regex": "(\\{)",
          "push": "main__1"
        },
        {
          "token": "punctuation",
          "regex": "(\\[)",
          "push": "main__2"
        },
        {
          "token": "punctuation",
          "regex": "(\\()",
          "push": "main__3"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\}|\\]|\\))"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\|)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:annotation|constraint|function|include|op|output|minimize|maximize|predicate|satisfy|solve|test|type)\\b)"
        },
        {
          "token": "storage.type",
          "regex": "(\\b(?:ann|array|bool|enum|float|int|list|of|par|set|string|tuple|var)\\b)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:for|forall|if|then|elseif|else|endif|where|let|in)\\b)"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\b(?:any|case|op|record)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:abort|abs|acosh|array_intersect|array_union|array1d|array2d|array3d|array4d|array5d|array6d|asin|assert|atan|bool2int|card|ceil|concat|cos|cosh|dom|dom_array|dom_size|fix|exp|floor|index_set|index_set_1of2|index_set_2of2|index_set_1of3|index_set_2of3|index_set_3of3|int2float|is_fixed|join|lb|lb_array|length|ln|log|log2|log10|min|max|pow|product|round|set2array|show|show_int|show_float|sin|sinh|sqrt|sum|tan|tanh|trace|ub|ub_array)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:circuit|disjoint|maximum|maximum_arg|member|minimum|minimum_arg|network_flow|network_flow_cost|partition_set|range|roots|sliding_sum|subcircuit|sum_pred)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alldifferent|all_different|all_disjoint|all_equal|alldifferent_except_0|nvalue|symmetric_all_different)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:lex2|lex_greater|lex_greatereq|lex_less|lex_lesseq|strict_lex2|value_precede|value_precede_chain)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:arg_sort|decreasing|increasing|sort)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:int_set_channel|inverse|inverse_set|link_set_to_booleans)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:among|at_least|at_most|at_most1|count|count_eq|count_geq|count_gt|count_leq|count_lt|count_neq|distribute|exactly|global_cardinality|global_cardinality_closed|global_cardinality_low_up|global_cardinality_low_up_closed)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:bin_packing|bin_packing_capa|bin_packing_load|diffn|diffn_k|diffn_nonstrict|diffn_nonstrict_k|geost|geost_bb|geost_smallest_bb|knapsack)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alternative|cumulative|disjunctive|disjunctive_strict|span)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:regular|regular_nfa|table)\\b)"
        },
        {
          "token": ["entity.name.function", "punctuation"],
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')(\\()",
          "push": "main__4"
        },
        {
          "token": "variable",
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')"
        },
        {
          defaultToken: "text",
        }
      ],
      "main__1": [{
          "token": "punctuation",
          "regex": "(\\})",
          "next": "pop"
        },
        {
          "token": "punctuation",
          "regex": "(\\|)"
        },
        {
          "token": "comment",
          "regex": "(/\\*)",
          "push": "multi_line_comment__1"
        },
        {
          "token": "comment",
          "regex": "(%.*)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0o[0-7]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+(?:(?:.\\d+)?[Ee][-+]?\\d+|.\\d+))"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+)"
        },
        {
          "token": "string",
          "regex": "(\\\")",
          "push": "string__1"
        },
        {
          "token": "constant.language",
          "regex": "(\\b(?:true|false)\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\bnot\\b|<->|->|<-|\\\\/|\\bxor\\b|/\\\\)"
        },
        {
          "token": "keyword.operator",
          "regex": "(<|>|<=|>=|==|=|!=)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\+|-|\\*|/|\\bdiv\\b|\\bmod\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\b(?:in|subset|superset|union|diff|symdiff|intersect)\\b|\\.\\.)"
        },
        {
          "token": "punctuation",
          "regex": "(;)"
        },
        {
          "token": "punctuation",
          "regex": "(:)"
        },
        {
          "token": "punctuation",
          "regex": "(,)"
        },
        {
          "token": "punctuation",
          "regex": "(\\{)",
          "push": "main__1"
        },
        {
          "token": "punctuation",
          "regex": "(\\[)",
          "push": "main__2"
        },
        {
          "token": "punctuation",
          "regex": "(\\()",
          "push": "main__3"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\}|\\]|\\))"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\|)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:annotation|constraint|function|include|op|output|minimize|maximize|predicate|satisfy|solve|test|type)\\b)"
        },
        {
          "token": "storage.type",
          "regex": "(\\b(?:ann|array|bool|enum|float|int|list|of|par|set|string|tuple|var)\\b)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:for|forall|if|then|elseif|else|endif|where|let|in)\\b)"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\b(?:any|case|op|record)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:abort|abs|acosh|array_intersect|array_union|array1d|array2d|array3d|array4d|array5d|array6d|asin|assert|atan|bool2int|card|ceil|concat|cos|cosh|dom|dom_array|dom_size|fix|exp|floor|index_set|index_set_1of2|index_set_2of2|index_set_1of3|index_set_2of3|index_set_3of3|int2float|is_fixed|join|lb|lb_array|length|ln|log|log2|log10|min|max|pow|product|round|set2array|show|show_int|show_float|sin|sinh|sqrt|sum|tan|tanh|trace|ub|ub_array)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:circuit|disjoint|maximum|maximum_arg|member|minimum|minimum_arg|network_flow|network_flow_cost|partition_set|range|roots|sliding_sum|subcircuit|sum_pred)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alldifferent|all_different|all_disjoint|all_equal|alldifferent_except_0|nvalue|symmetric_all_different)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:lex2|lex_greater|lex_greatereq|lex_less|lex_lesseq|strict_lex2|value_precede|value_precede_chain)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:arg_sort|decreasing|increasing|sort)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:int_set_channel|inverse|inverse_set|link_set_to_booleans)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:among|at_least|at_most|at_most1|count|count_eq|count_geq|count_gt|count_leq|count_lt|count_neq|distribute|exactly|global_cardinality|global_cardinality_closed|global_cardinality_low_up|global_cardinality_low_up_closed)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:bin_packing|bin_packing_capa|bin_packing_load|diffn|diffn_k|diffn_nonstrict|diffn_nonstrict_k|geost|geost_bb|geost_smallest_bb|knapsack)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alternative|cumulative|disjunctive|disjunctive_strict|span)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:regular|regular_nfa|table)\\b)"
        },
        {
          "token": ["entity.name.function", "punctuation"],
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')(\\()",
          "push": "main__4"
        },
        {
          "token": "variable",
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')"
        },
        {
          defaultToken: "text",
        }
      ],
      "main__2": [{
          "token": "punctuation",
          "regex": "(\\])",
          "next": "pop"
        },
        {
          "token": "punctuation",
          "regex": "(\\|)"
        },
        {
          "token": "comment",
          "regex": "(/\\*)",
          "push": "multi_line_comment__1"
        },
        {
          "token": "comment",
          "regex": "(%.*)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0o[0-7]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+(?:(?:.\\d+)?[Ee][-+]?\\d+|.\\d+))"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+)"
        },
        {
          "token": "string",
          "regex": "(\\\")",
          "push": "string__1"
        },
        {
          "token": "constant.language",
          "regex": "(\\b(?:true|false)\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\bnot\\b|<->|->|<-|\\\\/|\\bxor\\b|/\\\\)"
        },
        {
          "token": "keyword.operator",
          "regex": "(<|>|<=|>=|==|=|!=)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\+|-|\\*|/|\\bdiv\\b|\\bmod\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\b(?:in|subset|superset|union|diff|symdiff|intersect)\\b|\\.\\.)"
        },
        {
          "token": "punctuation",
          "regex": "(;)"
        },
        {
          "token": "punctuation",
          "regex": "(:)"
        },
        {
          "token": "punctuation",
          "regex": "(,)"
        },
        {
          "token": "punctuation",
          "regex": "(\\{)",
          "push": "main__1"
        },
        {
          "token": "punctuation",
          "regex": "(\\[)",
          "push": "main__2"
        },
        {
          "token": "punctuation",
          "regex": "(\\()",
          "push": "main__3"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\}|\\]|\\))"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\|)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:annotation|constraint|function|include|op|output|minimize|maximize|predicate|satisfy|solve|test|type)\\b)"
        },
        {
          "token": "storage.type",
          "regex": "(\\b(?:ann|array|bool|enum|float|int|list|of|par|set|string|tuple|var)\\b)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:for|forall|if|then|elseif|else|endif|where|let|in)\\b)"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\b(?:any|case|op|record)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:abort|abs|acosh|array_intersect|array_union|array1d|array2d|array3d|array4d|array5d|array6d|asin|assert|atan|bool2int|card|ceil|concat|cos|cosh|dom|dom_array|dom_size|fix|exp|floor|index_set|index_set_1of2|index_set_2of2|index_set_1of3|index_set_2of3|index_set_3of3|int2float|is_fixed|join|lb|lb_array|length|ln|log|log2|log10|min|max|pow|product|round|set2array|show|show_int|show_float|sin|sinh|sqrt|sum|tan|tanh|trace|ub|ub_array)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:circuit|disjoint|maximum|maximum_arg|member|minimum|minimum_arg|network_flow|network_flow_cost|partition_set|range|roots|sliding_sum|subcircuit|sum_pred)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alldifferent|all_different|all_disjoint|all_equal|alldifferent_except_0|nvalue|symmetric_all_different)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:lex2|lex_greater|lex_greatereq|lex_less|lex_lesseq|strict_lex2|value_precede|value_precede_chain)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:arg_sort|decreasing|increasing|sort)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:int_set_channel|inverse|inverse_set|link_set_to_booleans)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:among|at_least|at_most|at_most1|count|count_eq|count_geq|count_gt|count_leq|count_lt|count_neq|distribute|exactly|global_cardinality|global_cardinality_closed|global_cardinality_low_up|global_cardinality_low_up_closed)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:bin_packing|bin_packing_capa|bin_packing_load|diffn|diffn_k|diffn_nonstrict|diffn_nonstrict_k|geost|geost_bb|geost_smallest_bb|knapsack)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alternative|cumulative|disjunctive|disjunctive_strict|span)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:regular|regular_nfa|table)\\b)"
        },
        {
          "token": ["entity.name.function", "punctuation"],
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')(\\()",
          "push": "main__4"
        },
        {
          "token": "variable",
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')"
        },
        {
          defaultToken: "text",
        }
      ],
      "main__3": [{
          "token": "punctuation",
          "regex": "(\\))",
          "next": "pop"
        },
        {
          "token": "comment",
          "regex": "(/\\*)",
          "push": "multi_line_comment__1"
        },
        {
          "token": "comment",
          "regex": "(%.*)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0o[0-7]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+(?:(?:.\\d+)?[Ee][-+]?\\d+|.\\d+))"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+)"
        },
        {
          "token": "string",
          "regex": "(\\\")",
          "push": "string__1"
        },
        {
          "token": "constant.language",
          "regex": "(\\b(?:true|false)\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\bnot\\b|<->|->|<-|\\\\/|\\bxor\\b|/\\\\)"
        },
        {
          "token": "keyword.operator",
          "regex": "(<|>|<=|>=|==|=|!=)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\+|-|\\*|/|\\bdiv\\b|\\bmod\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\b(?:in|subset|superset|union|diff|symdiff|intersect)\\b|\\.\\.)"
        },
        {
          "token": "punctuation",
          "regex": "(;)"
        },
        {
          "token": "punctuation",
          "regex": "(:)"
        },
        {
          "token": "punctuation",
          "regex": "(,)"
        },
        {
          "token": "punctuation",
          "regex": "(\\{)",
          "push": "main__1"
        },
        {
          "token": "punctuation",
          "regex": "(\\[)",
          "push": "main__2"
        },
        {
          "token": "punctuation",
          "regex": "(\\()",
          "push": "main__3"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\}|\\]|\\))"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\|)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:annotation|constraint|function|include|op|output|minimize|maximize|predicate|satisfy|solve|test|type)\\b)"
        },
        {
          "token": "storage.type",
          "regex": "(\\b(?:ann|array|bool|enum|float|int|list|of|par|set|string|tuple|var)\\b)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:for|forall|if|then|elseif|else|endif|where|let|in)\\b)"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\b(?:any|case|op|record)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:abort|abs|acosh|array_intersect|array_union|array1d|array2d|array3d|array4d|array5d|array6d|asin|assert|atan|bool2int|card|ceil|concat|cos|cosh|dom|dom_array|dom_size|fix|exp|floor|index_set|index_set_1of2|index_set_2of2|index_set_1of3|index_set_2of3|index_set_3of3|int2float|is_fixed|join|lb|lb_array|length|ln|log|log2|log10|min|max|pow|product|round|set2array|show|show_int|show_float|sin|sinh|sqrt|sum|tan|tanh|trace|ub|ub_array)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:circuit|disjoint|maximum|maximum_arg|member|minimum|minimum_arg|network_flow|network_flow_cost|partition_set|range|roots|sliding_sum|subcircuit|sum_pred)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alldifferent|all_different|all_disjoint|all_equal|alldifferent_except_0|nvalue|symmetric_all_different)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:lex2|lex_greater|lex_greatereq|lex_less|lex_lesseq|strict_lex2|value_precede|value_precede_chain)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:arg_sort|decreasing|increasing|sort)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:int_set_channel|inverse|inverse_set|link_set_to_booleans)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:among|at_least|at_most|at_most1|count|count_eq|count_geq|count_gt|count_leq|count_lt|count_neq|distribute|exactly|global_cardinality|global_cardinality_closed|global_cardinality_low_up|global_cardinality_low_up_closed)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:bin_packing|bin_packing_capa|bin_packing_load|diffn|diffn_k|diffn_nonstrict|diffn_nonstrict_k|geost|geost_bb|geost_smallest_bb|knapsack)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alternative|cumulative|disjunctive|disjunctive_strict|span)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:regular|regular_nfa|table)\\b)"
        },
        {
          "token": ["entity.name.function", "punctuation"],
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')(\\()",
          "push": "main__4"
        },
        {
          "token": "variable",
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')"
        },
        {
          defaultToken: "text",
        }
      ],
      "main__4": [{
          "token": "punctuation",
          "regex": "(\\))",
          "next": "pop"
        },
        {
          "token": "comment",
          "regex": "(/\\*)",
          "push": "multi_line_comment__1"
        },
        {
          "token": "comment",
          "regex": "(%.*)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0o[0-7]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+(?:(?:.\\d+)?[Ee][-+]?\\d+|.\\d+))"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+)"
        },
        {
          "token": "string",
          "regex": "(\\\")",
          "push": "string__1"
        },
        {
          "token": "constant.language",
          "regex": "(\\b(?:true|false)\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\bnot\\b|<->|->|<-|\\\\/|\\bxor\\b|/\\\\)"
        },
        {
          "token": "keyword.operator",
          "regex": "(<|>|<=|>=|==|=|!=)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\+|-|\\*|/|\\bdiv\\b|\\bmod\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\b(?:in|subset|superset|union|diff|symdiff|intersect)\\b|\\.\\.)"
        },
        {
          "token": "punctuation",
          "regex": "(;)"
        },
        {
          "token": "punctuation",
          "regex": "(:)"
        },
        {
          "token": "punctuation",
          "regex": "(,)"
        },
        {
          "token": "punctuation",
          "regex": "(\\{)",
          "push": "main__1"
        },
        {
          "token": "punctuation",
          "regex": "(\\[)",
          "push": "main__2"
        },
        {
          "token": "punctuation",
          "regex": "(\\()",
          "push": "main__3"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\}|\\]|\\))"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\|)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:annotation|constraint|function|include|op|output|minimize|maximize|predicate|satisfy|solve|test|type)\\b)"
        },
        {
          "token": "storage.type",
          "regex": "(\\b(?:ann|array|bool|enum|float|int|list|of|par|set|string|tuple|var)\\b)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:for|forall|if|then|elseif|else|endif|where|let|in)\\b)"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\b(?:any|case|op|record)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:abort|abs|acosh|array_intersect|array_union|array1d|array2d|array3d|array4d|array5d|array6d|asin|assert|atan|bool2int|card|ceil|concat|cos|cosh|dom|dom_array|dom_size|fix|exp|floor|index_set|index_set_1of2|index_set_2of2|index_set_1of3|index_set_2of3|index_set_3of3|int2float|is_fixed|join|lb|lb_array|length|ln|log|log2|log10|min|max|pow|product|round|set2array|show|show_int|show_float|sin|sinh|sqrt|sum|tan|tanh|trace|ub|ub_array)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:circuit|disjoint|maximum|maximum_arg|member|minimum|minimum_arg|network_flow|network_flow_cost|partition_set|range|roots|sliding_sum|subcircuit|sum_pred)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alldifferent|all_different|all_disjoint|all_equal|alldifferent_except_0|nvalue|symmetric_all_different)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:lex2|lex_greater|lex_greatereq|lex_less|lex_lesseq|strict_lex2|value_precede|value_precede_chain)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:arg_sort|decreasing|increasing|sort)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:int_set_channel|inverse|inverse_set|link_set_to_booleans)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:among|at_least|at_most|at_most1|count|count_eq|count_geq|count_gt|count_leq|count_lt|count_neq|distribute|exactly|global_cardinality|global_cardinality_closed|global_cardinality_low_up|global_cardinality_low_up_closed)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:bin_packing|bin_packing_capa|bin_packing_load|diffn|diffn_k|diffn_nonstrict|diffn_nonstrict_k|geost|geost_bb|geost_smallest_bb|knapsack)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alternative|cumulative|disjunctive|disjunctive_strict|span)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:regular|regular_nfa|table)\\b)"
        },
        {
          "token": ["entity.name.function", "punctuation"],
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')(\\()",
          "push": "main__4"
        },
        {
          "token": "variable",
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')"
        },
        {
          defaultToken: "text",
        }
      ],
      "multi_line_comment__1": [{
          "token": "comment",
          "regex": "(\\*/)",
          "next": "pop"
        },
        {
          defaultToken: "comment",
        }
      ],
      "string__1": [{
          "token": "string",
          "regex": "(\\\")",
          "next": "pop"
        },
        {
          "token": "punctuation",
          "regex": "(\\\\\\()",
          "push": "string__2"
        },
        {
          "token": "constant.character.escape",
          "regex": "(\\\\[\"'\\\\nrvt])"
        },
        {
          "token": "string",
          "regex": "([^\\\"\\\\]+)"
        },
        {
          defaultToken: "text",
        }
      ],
      "string__2": [{
          "token": "punctuation",
          "regex": "(\\))",
          "next": "pop"
        },
        {
          "token": "comment",
          "regex": "(/\\*)",
          "push": "multi_line_comment__1"
        },
        {
          "token": "comment",
          "regex": "(%.*)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0o[0-7]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b0x[0-9A-Fa-f]+)"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+(?:(?:.\\d+)?[Ee][-+]?\\d+|.\\d+))"
        },
        {
          "token": "constant.numeric",
          "regex": "(\\b\\d+)"
        },
        {
          "token": "string",
          "regex": "(\\\")",
          "push": "string__1"
        },
        {
          "token": "constant.language",
          "regex": "(\\b(?:true|false)\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\bnot\\b|<->|->|<-|\\\\/|\\bxor\\b|/\\\\)"
        },
        {
          "token": "keyword.operator",
          "regex": "(<|>|<=|>=|==|=|!=)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\+|-|\\*|/|\\bdiv\\b|\\bmod\\b)"
        },
        {
          "token": "keyword.operator",
          "regex": "(\\b(?:in|subset|superset|union|diff|symdiff|intersect)\\b|\\.\\.)"
        },
        {
          "token": "punctuation",
          "regex": "(;)"
        },
        {
          "token": "punctuation",
          "regex": "(:)"
        },
        {
          "token": "punctuation",
          "regex": "(,)"
        },
        {
          "token": "punctuation",
          "regex": "(\\{)",
          "push": "main__1"
        },
        {
          "token": "punctuation",
          "regex": "(\\[)",
          "push": "main__2"
        },
        {
          "token": "punctuation",
          "regex": "(\\()",
          "push": "main__3"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\}|\\]|\\))"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\|)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:annotation|constraint|function|include|op|output|minimize|maximize|predicate|satisfy|solve|test|type)\\b)"
        },
        {
          "token": "storage.type",
          "regex": "(\\b(?:ann|array|bool|enum|float|int|list|of|par|set|string|tuple|var)\\b)"
        },
        {
          "token": "keyword.control",
          "regex": "(\\b(?:for|forall|if|then|elseif|else|endif|where|let|in)\\b)"
        },
        {
          "token": "invalid.illegal",
          "regex": "(\\b(?:any|case|op|record)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:abort|abs|acosh|array_intersect|array_union|array1d|array2d|array3d|array4d|array5d|array6d|asin|assert|atan|bool2int|card|ceil|concat|cos|cosh|dom|dom_array|dom_size|fix|exp|floor|index_set|index_set_1of2|index_set_2of2|index_set_1of3|index_set_2of3|index_set_3of3|int2float|is_fixed|join|lb|lb_array|length|ln|log|log2|log10|min|max|pow|product|round|set2array|show|show_int|show_float|sin|sinh|sqrt|sum|tan|tanh|trace|ub|ub_array)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:circuit|disjoint|maximum|maximum_arg|member|minimum|minimum_arg|network_flow|network_flow_cost|partition_set|range|roots|sliding_sum|subcircuit|sum_pred)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alldifferent|all_different|all_disjoint|all_equal|alldifferent_except_0|nvalue|symmetric_all_different)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:lex2|lex_greater|lex_greatereq|lex_less|lex_lesseq|strict_lex2|value_precede|value_precede_chain)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:arg_sort|decreasing|increasing|sort)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:int_set_channel|inverse|inverse_set|link_set_to_booleans)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:among|at_least|at_most|at_most1|count|count_eq|count_geq|count_gt|count_leq|count_lt|count_neq|distribute|exactly|global_cardinality|global_cardinality_closed|global_cardinality_low_up|global_cardinality_low_up_closed)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:bin_packing|bin_packing_capa|bin_packing_load|diffn|diffn_k|diffn_nonstrict|diffn_nonstrict_k|geost|geost_bb|geost_smallest_bb|knapsack)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:alternative|cumulative|disjunctive|disjunctive_strict|span)\\b)"
        },
        {
          "token": "support.function",
          "regex": "(\\b(?:regular|regular_nfa|table)\\b)"
        },
        {
          "token": ["entity.name.function", "punctuation"],
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')(\\()",
          "push": "main__4"
        },
        {
          "token": "variable",
          "regex": "(\\b[A-Za-z][A-Za-z0-9_]*|'[^']*')"
        },
        {
          defaultToken: "text",
        }
      ]
    };
    this.normalizeRules();
  };
  /* ------------------------ END ------------------------------ */
  oop.inherits(MznHighlightRules, TextHighlightRules);
  exports.MznHighlightRules = MznHighlightRules;
});
