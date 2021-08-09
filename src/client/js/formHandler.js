
const dataResult = document.querySelector('.url-result');

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('url').value;
    
    if(Client.checkForURL(formText)) {
        
        console.log("::: Form Submitted :::")
        postData('/apiCall', { url: formText })
            .then((data) => {
                showData(data);
            });
            resetValue();
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

const showData = (data) => {

    const updateUI = `
            <div id="results">
                <div class="url-stats">
                    <div id="polarity"> <strong>Polarity:${data.score_tag}</strong> </div>
                    <div id="agreement"> <strong>Agreement:${data.agreement}</strong> </div>
                    <div id="subjectivity"><strong>Subjectivity:${data.subjectivity}</strong> </div>
                    <div id="confidence"> <strong>Confidence:${data.confidence}</strong> </div>
                    <div id="irony"> <strong>Irony:${data.irony}</strong></div>
                </div>
                <img src="/img1.png" alt="robo pic">
            </div>
    `
    dataResult.innerHTML = updateUI;
}

export { handleSubmit }

const resetValue = () => {
    document.getElementById('url').value = '';
}