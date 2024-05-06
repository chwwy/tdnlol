export async function submitComment(comment: string) {
    if (comment == null) {
        throw new Error('All fields are required.');
    }

    const webhookUrl = 'https://discord.com/api/webhooks/1223655079039467550/DLn0bgbJzv1Mwwv5CCOZaVQhlUkymAaxgKqvWtsO4T3r08PcS5clI1tauDpvCuEOUmoR';
  
    const embeds = [
      {
        type: "rich",
        title: `New comment just sent!`,
        description: `${comment}`,
        color: 0xffd1dc,
        author: {
            "name": `comment-hook`,
            "url": `https://tdn.lol/`,
            "icon_url": `https://png.pngtree.com/png-clipart/20230104/original/pngtree-pink-heart-with-black-outline-clipart-png-image_8871174.png`
          },
        footer: {
          text: `tdn.lol`
        }
      }
    ];
  
    const submissionData = new FormData();
    submissionData.append('payload_json', JSON.stringify({ embeds }));
  
  
    const response = await fetch(webhookUrl, {
        method: 'POST',
        body: submissionData,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}