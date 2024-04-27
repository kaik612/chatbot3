const apiUrl = 'http://localhost:1234/v1/chat/completions';

// Định nghĩa đối tượng headers với Content-Type
const headers = {
  'Content-Type': 'application/json',
};

async function makeRequest() {
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      model: 'NousResearch/Hermes-2-Pro-Mistral-7B-GGUF/Hermes-2-Pro-Mistral-7B.Q2_K.gguf',
      messages: [
        { "role": "system", "content": "I am an assistant that can answer any questions in Japanese, Vietnamese, and English." },
        { "role": "user", "content": "generate multiple choice questions in Japanese about anything. Include the questions, four choices for each question, the correct answer, and an explanation for the correct answer. Return the response in JSON format, write me in Japanese" }
      ],
      temperature: 0.7,
      max_tokens: -1,
      stream: false
    }),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Content of each choice:');
        data.choices.forEach(choice => {
    console.log(JSON.parse(JSON.stringify(choice.message.content, null, 2)));
});

    // Kiểm tra nếu response chứa cấu trúc dữ liệu mong muốn
    if (!data) {
      throw new Error('Invalid response format or no choices found.');
    }

    // Trích xuất các câu hỏi từ response
    const generatedQuestions = data.map(item => ({
      question: item.text,
      choices: item.answers,
      correctAnswer: item.answer,
      explanation: item.explanation
    }));

    // Format câu hỏi thành chuỗi JSON
    const formattedQuestions = JSON.stringify(generatedQuestions, null, 2);

    return formattedQuestions;
  } catch (error) {
    console.error('There was a problem fulfilling the request:', error.message);
    return null;
  }
}


async function getGeneratedQuestions() {
  try {
    const questionsJSON = await makeRequest();
    if (questionsJSON) {
      console.log('question:'+ questionsJSON); // Ghi log chuỗi JSON đã định dạng
      return questionsJSON; // Trả về chuỗi JSON đã định dạng
    } else {
      console.error('Failed to fetch generated questions.');
      return null;
    }
  } catch (error) {
    console.error('error:'+ error.message);
    return null;
  }
}

getGeneratedQuestions();
