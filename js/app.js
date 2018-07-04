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
		    $(".employee").click( () => {

                function modalZoom(i) {

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
                modalZoom($(".employee").attr('id'));
                // Display modalOverlay
                $('.modal-overlay').fadeIn();
                // Display modal
                $("#modal").fadeIn();

            // Click overlay to close 
                $(".modal-overlay").on('click', () => {
                    // Hide modalOverlay
                    $('.modal-overlay').fadeOut();
                    // Hide modal
                    $("#modal").fadeOut();
                });

            // Close button on modal overlay
                $("#close").on('click', () => {
                    // Hide modalOverlay
                    $('.modal-overlay').fadeOut();
                    // Hide modal
                    $("#modal").fadeOut();
                });

            }); // end employee clicked function
        } // end success function
    }); // end ajax
}); // end document.ready function