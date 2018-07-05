$(document).ready(function () {

// Directory //

    $.ajax({
        url: 'https://randomuser.me/api/?results=12&nat=us',
        dataType: 'json',

        success: (data) => {

            console.log(data);

            const profile = data.results;
            let employeeIndex = 0;
            let employeeUl = `<ul id="employee-list">`;

            $.each(profile, (i) => {
  		 	
                employeeUl += 
                // id="${employeeIndex++}" used to create individual id for each employee 
                    `<li id="${employeeIndex++}" class="employee clearfix">
                            <img class ="profile-image" src="${profile[i].picture.large}">
                        <ul class="info-container clearfix">
                            <li class="name">${profile[i].name.first} ${profile[i].name.last}</li>
                            <li class="email">${profile[i].email}</li>
                            <li class="city">${profile[i].location.city}</li>
                        </ul>
                    </li>`;	
            });

            employeeUl += "</ul>";

            $("#directory").html(employeeUl);


//  Modal //

		//Function to run when employee card is clicked
		    $(".employee").click( function (e) {

                e.preventDefault();

                function modalZoom(i) {

                    // Format birthday date
                    let day = profile[i].dob.date.substr(8, 2);
                    let month = profile[i].dob.date.substr(5, 2);
                    let year = profile[i].dob.date.substr(0, 4).slice(2, 4);
                
                    profile[i].dob.date = month + '/' + day + '/' + year;

                    $("#modal").html(
                        `<div class="close-container">
                            <span id="close">&times;</span>
                        </div>
                        <img class="image-modal" src="${profile[i].picture.large}"> 
                            <div class="info-modal">
                                <p class="name-modal">${profile[i].name.first}  ${profile[i].name.last}</p>
                                <p class="email-modal">${profile[i].email}</p>
                                <p class="city-modal">${profile[i].location.city}</p>
                            <div class="line"></div>
                                <p class="cell-modal">${profile[i].cell}</p>
                            <div class="address-modal">
                                <span>${profile[i].location.street}</span>
                                <span>${profile[i].location.city}, </span>
                                <span>${profile[i].location.state}</span> 
                                <span>${profile[i].location.postcode}</span>		 						
                            </div>
                                <p class="birthday-modal">Birthday: ${profile[i].dob.date}</p>
                        </div>`);
                } // end modalZoom function
                
                // Run modal function
                modalZoom($(this).attr('id'));
                // Display modalOverlay
                $('.modal-overlay').fadeIn();
                // Display modal
                $("#modal").fadeIn();

            // Click overlay to close 
                $(".modal-overlay").on('click', (e) => {
                    e.preventDefault();
                    // Hide modalOverlay
                    $('.modal-overlay').fadeOut();
                    // Hide modal
                    $("#modal").fadeOut();
                });

            // Close button on modal overlay
                $("#close").on('click', (e) => {
                    e.preventDefault();
                    // Hide modalOverlay
                    $('.modal-overlay').fadeOut();
                    // Hide modal
                    $("#modal").fadeOut();
                });

            }); // end employee clicked function
        } // end success function
    }); // end ajax
}); // end document.ready function