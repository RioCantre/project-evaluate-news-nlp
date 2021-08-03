function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value;
    
    if(Client.checkForURL(formText)) {
        
        console.log("::: Form Submitted :::")
        postData('http://localhost:8081/apiCall', {url: formText})
            .then((data) => {
                document.getElementById('polarity').innerHTML = `Polarity: ${data.score_tag}`;
                document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement}`;
                document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`;
                document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence}`;
                document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
                document.getElementById("img-url").innerHTML = `<img src="${data.img}" alt="article image">`;
                document.getElementById("title").innerHTML = `${data.headline}`;
                document.getElementById("article-detail").innerHTML = `${data.writer} | ${data.date}`;
                document.getElementById("article-content").innerHTML = ` ${data.text}`;
                document.getElementById("url-link").innerHTML = `<a href="${data.url}"> Read more</a>`;
            })
    } else {
        alert('You need to enter the proper URL!')
    }
  
}

const postData = async (url = "", data = {}) => {
    console.log('Analyzing:', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

export { handleSubmit }
