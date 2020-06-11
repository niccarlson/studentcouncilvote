var voted = 0;
var votes = {
	"president": [null, "No vote"],
	"vice": [null, "No vote"],
	"treasurer": [null, "No vote"],
	"secretary": [null, "No vote"],
	"representative": [[null, null, null, null, null, null], ["No vote", "No vote", "No vote", "No vote", "No vote", "No vote"]]
}
var entryKey = {
	"president": 0,
	"vice": 0,
	"treasurer": 0,
	"secretary": 0,
	"representative": 0
}

document.getElementById('slide2').style.display = 'none'
document.getElementById('slide3').style.display = 'none'
document.getElementById('slide4').style.display = 'none'
document.getElementById('slide5').style.display = 'none'

function removeHero(){
	var el = document.getElementById('heroMessage')
	document.documentElement.style.setProperty('--hero-height', el.clientHeight + "px");

	if(document.body.clientWidth < 1200){
		el.style = `margin-top: -${el.clientHeight + 24}px;`
	} else {
		el.style = `margin-top: -${el.clientHeight + -220}px;`
	}
	el.classList.add('heroHidden')
	setTimeout(function(){
		el.classList.add('displayNone')
		document.getElementsByClassName('container')[0].classList.add('formSpacer')
	}, 500)
}

function changeVote(position, selected){
	switch(position){
		case 0:
			var entries = entryKey.president
			votes.president[0] = document.getElementById(`vote0${selected}`).getAttribute('voteId')
			votes.president[1] = document.getElementById(`vote0${selected}`).value
			break
		case 1:
			var entries = entryKey.vice
			votes.vice[0] = document.getElementById(`vote1${selected}`).getAttribute('voteId')
			votes.vice[1] = document.getElementById(`vote1${selected}`).value

			break
		case 2:
			var entries = entryKey.treasurer
			votes.treasurer[0] = document.getElementById(`vote2${selected}`).getAttribute('voteId')
			votes.treasurer[1] = document.getElementById(`vote2${selected}`).value

			break
		case 3:
			var entries = entryKey.secretary
			votes.secretary[0] = document.getElementById(`vote3${selected}`).getAttribute('voteId')
			votes.secretary[1] = document.getElementById(`vote3${selected}`).value

			break
		case 4:
			var entries = entryKey.representative
			if(document.getElementById(`vote${position}${selected}`).classList.contains('voteSelected')){
				document.getElementById(`vote${position}${selected}`).classList.remove('voteSelected')
				document.getElementById(`vote${position}${selected}`).nextElementSibling.innerHTML = `<i class="far fa-square"></i>`
				voted--;
				for(let i = 0; i < entries; i++) {
					if(!document.getElementById(`vote4${i}`).classList.contains('voteSelected')){
						document.getElementById(`vote4${i}`).removeAttribute('disabled')
					}
				}
			} else if(voted < 5) {
				document.getElementById(`vote${position}${selected}`).classList.add('voteSelected')
				document.getElementById(`vote${position}${selected}`).nextElementSibling.innerHTML = `<i class="fas fa-square"></i>`
				voted++;
			} else if(voted == 5) {
				document.getElementById(`vote${position}${selected}`).classList.add('voteSelected')
				document.getElementById(`vote${position}${selected}`).nextElementSibling.innerHTML = `<i class="fas fa-square"></i>`
				voted++;
				for(let i = 0; i < entries; i++) {
					if(!document.getElementById(`vote4${i}`).classList.contains('voteSelected')){
						document.getElementById(`vote4${i}`).setAttribute('disabled', '')
					}
				}
			}
			for(let i = 0; i < entries; i++) {
				votes.representative[0][i] = document.getElementById(`vote4${selected}`).getAttribute('voteId')
				votes.representative[1][i] = document.getElementById(`vote4${selected}`).value
			}
			break
	}
	if(position != 4) {
		for (let i = 0; i < entries; i++) {
			document.getElementById(`vote${position}${i}`).classList.remove('voteSelected')
			document.getElementById(`vote${position}${i}`).nextElementSibling.innerHTML = `<i class="far fa-circle"></i>`
		}
		document.getElementById(`vote${position}${selected}`).classList.add('voteSelected')
		document.getElementById(`vote${position}${selected}`).nextElementSibling.innerHTML = `<i class="fas fa-circle"></i>`
	}
}



function showSlide(slideNum) {

	if(slideNum == 2) {
		var lastName = document.getElementById('lastName')
		var studentNumber = document.getElementById('studentNumber')
		lastName.setAttribute('disabled', '')
		studentNumber.setAttribute('disabled', '')
		document.getElementById('submitInfo').classList.add('is-loading')
		document.getElementById('loginHeaderLabel').classList.add('transitionTextOut')
		removeHero()

		setTimeout(function(){
			document.getElementById('loginHeaderLabel').innerHTML = 'Verifying identity...'
			document.getElementById('loginHeaderLabel').classList.remove('transitionTextOut')
			document.getElementById('loginHeaderLabel').classList.add('transitionTextIn')
		}, 450)
		
		if(lastName.value.length == 0 && studentNumber.value.length != 6) {

		} else if(lastName.value.length == 0) {

		} else if(studentNumber.value.length == 0) {
			lastName.removeAttribute('disabled')
			studentNumber.removeAttribute('disabled')
			document.getElementById('submitInfo').classList.remove('is-loading')
			document.getElementById('studentNumber').classList.add('is-danger')
			document.getElementById('e_iconStudentId').classList.remove('is-hidden')
			document.getElementById('e_labelStudentId').classList.remove('is-hidden')
			document.getElementById('e_labelStudentId').innerHTML = "Please enter a student ID number."
		} else if(studentNumber.value.length < 6) {
			lastName.removeAttribute('disabled')
			studentNumber.removeAttribute('disabled')
			document.getElementById('submitInfo').classList.remove('is-loading')
			document.getElementById('studentNumber').classList.add('is-danger')
			document.getElementById('e_iconStudentId').classList.remove('is-hidden')
			document.getElementById('e_labelStudentId').classList.remove('is-hidden')
			document.getElementById('e_labelStudentId').innerHTML = "Please enter a valid six-digit student ID number."
		} else {
			setTimeout(function(){
				document.getElementById('slide1').style.display = 'none'
				document.getElementById('slide2').style.display = ''
			}, 2000)
		}
		} else if(slideNum == 4) {
		document.getElementById('presidentConfirmLabel').innerHTML = votes.president[1]
		document.getElementById('presidentConfirmLabel').innerHTML = votes.vice[1]
		document.getElementById('presidentConfirmLabel').innerHTML = votes.treasurer[1]
		document.getElementById('presidentConfirmLabel').innerHTML = votes.secretary[1]

		for (let i = 0; i < 6; i++) {
		document.getElementById(`repConfirmLabel${i}`).innerHTML = votes.representative[1][i]
		}
		document.getElementById('slide3').style.display = 'none'
		document.getElementById('slide4').style.display = ''
		document.getElementById('slide5').style.display = 'none'
	} else if(slideNum == 5) {
		sendVote()
		document.getElementById('slide5').style.display = ''
		document.getElementById('slide3').style.display = 'none'
		document.getElementById('slide4').style.display = 'none'
	} else {
		document.getElementById('slide1').style.display = 'none'
		document.getElementById('slide2').style.display = 'none'
		document.getElementById('slide3').style.display = 'none'
		document.getElementById('slide4').style.display = 'none'
		document.getElementById('slide5').style.display = 'none'
		document.getElementById(`slide${slideNum}`).style.display = ''
	}
}

function sendVote(){
	db.collection("voting-table").add({
		presidentVoteId: votes.president[0],
		vicePresidentVoteId: votes.vice[0],
		treasurerVoteId: votes.treasurer[0],
		secretaryVoteId: votes.secretary[0],
		representativesVoteIdArray: votes.representative[0],
		timestampVoted: firebase.firestore.Timestamp.fromDate(new Date()),
		studentId: document.getElementById('studentNumber').value
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
}

function getCandidates(){
	db.collection("candidate-lookup-table").where("position", "==", "president")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addNode(0, doc.data().name, entryKey.president, doc.id)
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
	});
	


	db.collection("candidate-lookup-table").where("position", "==", "vice")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addNode(1, doc.data().name, entryKey.vice, doc.id)
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
	});
	


	db.collection("candidate-lookup-table").where("position", "==", "treasurer")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addNode(2, doc.data().name, entryKey.treasurer, doc.id)
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
	});


	
	db.collection("candidate-lookup-table").where("position", "==", "secretary")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addNode(3, doc.data().name, entryKey.secretary, doc.id)
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
	});



	db.collection("candidate-lookup-table").where("position", "==", "representative")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            addNode(4, doc.data().name, entryKey.representative, doc.id)
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
	});
}


function addNode(position, name, index, voteId) {
	if(position == 4) {
		var newNode = document.getElementById('cloneNodeCheckbox').cloneNode(true)
	} else {
		var newNode = document.getElementById('cloneNodeRadio').cloneNode(true)
	}
	newNode.getElementsByTagName('input')[0].value = name
	newNode.getElementsByTagName('input')[0].id = `vote${position}${index}`
	newNode.getElementsByTagName('input')[0].setAttribute('onclick',`changeVote(${position},${index})`)
	newNode.getElementsByTagName('input')[0].setAttribute('voteId', voteId)
	switch(position){
		case 0:
			entryKey.president++
			document.getElementById('presidentColumn').appendChild(newNode)
			break
		case 1:
			entryKey.vice++
			document.getElementById('vicePresidentColumn').appendChild(newNode)
			break
		case 2:
			entryKey.treasurer++
			document.getElementById('treasurerColumn').appendChild(newNode)
			break
		case 3:
			entryKey.secretary++
			document.getElementById('secretaryColumn').appendChild(newNode)
			break
		case 4:
			entryKey.representative++
			if(entryKey.representative % 2 == 0) {
				document.getElementById('representativeColumnRight').appendChild(newNode)
				break
			} else {
				document.getElementById('representativeColumnLeft').appendChild(newNode)
				break
			}
	}
}
