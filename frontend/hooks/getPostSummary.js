function getPostSummary(content) {
  content = JSON.parse(content);
  const max_depth_length = 3;
  const max_characters = 300;

  let no_of_lines = content["blocks"].length;

  let summary_array = [];
  let summary_characters = "";

  for (let i = 0; i < max_depth_length && i < no_of_lines; i++) {
    if (summary_characters.length >= max_characters) {
      break;
    }
    let current_block_text = content["blocks"][i]["text"];
    let remaining_length = max_characters - summary_characters.length;
    let block_insert_string = current_block_text.substr(0, remaining_length);
    summary_characters += content["blocks"][i]["text"];
    content["blocks"][i]["text"] = block_insert_string;
    summary_array.push(content["blocks"][i]);
  }

  return JSON.stringify({
    blocks: summary_array,
    entityMap: content.entityMap,
  });
}

export default getPostSummary;
