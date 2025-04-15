import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
   
    if (command !== Buffer.from("cHVzc3k=", "base64").toString("utf-8")) {
      throw new Error("𝘊𝘰𝘮𝘢𝘯𝘥𝘰 𝘯𝘰 𝘳𝘦𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰.🥖");
    }

   
    const apiUrl = Buffer.from("aHR0cHM6Ly9kZWxpcml1cy1hcGlvZmMudmVyY2VsLmFwcC9uc2Z3L2dpcmxz", "base64").toString("utf-8");

    // Realizar la solicitud a la API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`𝘓𝘢 𝘈𝘗𝘐 𝘥𝘦𝘷𝘰𝘭𝘷𝘪𝘰 𝘶𝘯 𝘦𝘴𝘵𝘢𝘥𝘰 𝘏𝘛𝘛𝘗 ${response.status}.🥖`);
    }

    const imageBuffer = await response.buffer();

    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: Buffer.from("8J+PjSBBCcOkcO8YSB0aWVuZXMgdW5hIGltYWdlbiBhbGVhdG9yaWEgc29saWNpdGFkYSBjb24gZWwgY29tYW5kbyAq", "base64").toString("utf-8") + `${usedPrefix}${command}*.`,
    });
  } catch (error) {
    console.error("𝘌𝘳𝘳𝘰𝘳 𝘥𝘦𝘴𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰. 🥖", error);
    await conn.sendMessage(m.chat, {
      text: Buffer.from("4piNICBPY3VycmlvIHVuIGVycm9yIGFsIGludGVudGFyIHByb2Nlc2FyIHR1IHNvbGljaXR1ZDo=", "base64").toString("utf-8") +
        `\n${error.message || "𝘌𝘳𝘳𝘰𝘳 𝘥𝘦𝘴𝘤𝘰𝘯𝘰𝘤𝘪𝘥𝘰. 🥖 "}`,
    });
  }
};

handler.command = [Buffer.from("cHVzc3k=", "base64").toString("utf-8")];

export default handler;
