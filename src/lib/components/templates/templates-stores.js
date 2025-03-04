import { writable, derived } from 'svelte/store';

// template variables

// Synchrony Variables
export const organizationName = writable('SUNRISE APPLIANCE');
export const synchImagesLink = writable('images/synchrony');
export const locationSlug = writable('/hickory-nc');
export const synchUrlCode = writable('/mmc/NS225154900');

// Epic Protect Variables 
export const epicProImg = writable('images/epic-protection-plans');


// This export only admits the values: 'liveView', 'html', 'css', 'js'
export const viewSelector = writable('liveView');

// This is a state manegment variable aiming to manage the active template and the active navigation tool
export const activeTool = writable('synchrony-template');




// templates stores

export const synchronyHtml = derived([organizationName, synchImagesLink, locationSlug, synchUrlCode], ([$organizationName, $synchImagesLink, $locationSlug, $synchUrlCode]) => {
  let synchText = `<article class="financing-section">
	<!-- Fist image container having 2 imaage, one bor desktop and one for mobile -->
	<section class="financing-banner">
		<!-- Link for the financing page asociated -->
		<a href="https://www.mysynchrony.com${$synchUrlCode}" target="_blank" title="Financing Available">
			<!-- Desktop image -->
			<!-- IMPORTANT change the src of the credit card image for the one on your site's media assets This is the desktop version which is the fist banner that ussually is used on the slider banner too -->
			<img
				class="f-desktop lazyload"
				loading="lazy"
				src="${$synchImagesLink}/landing_heroSYNC.webp"
			/>
			<!-- mobile image -->
			<!-- IMPORTANT change the src of the credit card image for the one on your site's media assets This is the mobile version which is has a vertical aligned information -->
			<img
				class="f-mobile lazyload"
				loading="lazy"
				src="${$synchImagesLink}/landing_hero_mobile.webp"
				alt="Promotional financing banner"
			/>
		</a>
	</section>
	<!-- Second image container, don't have any link asociated, is just stetically here but it also contains image versions for desktop and mobile -->
	<section class="credit-card-banner">
		<!-- Desktop image -->
		<!-- IMPORTANT change the src of the credit card image for the one on your site's media assets This is the desktop version which is the one that fits across the screen -->
		<img
			class="f-desktop lazyload"
			loading="lazy"
			src="${$synchImagesLink}/below_heroSYNC.webp"
			alt="Synchrony credit card accepted banner"
		/>
		<!-- Mobile image -->
		<!-- IMPORTANT change the src of the credit card image for the one on your site's media assets This is the mobile version which is more square -->
		<img
			class="f-mobile lazyload"
			loading="lazy"
			src="${$synchImagesLink}/below_hero_mobile.webp"
			alt="Synchrony credit card accepted banner"
		/>
	</section>
	<!-- This is the main container where you will find the big block displaying the 12-60 in yellow outline and white background and the 6 in blue -->
	<section class="synchrony-info yellow-outline">
		<!-- Top image whith Synchrony home text -->
		<div class="info__top-img">
			<!-- IMPORTANT change the src of the credit card image for the one on your site's media assets This is used both for desktop and mobile and is the little Synchrony Home image displayed on top of the big numbers containers -->
			<img
				class="lazyload"
				loading="lazy"
				src="${$synchImagesLink}/synchrony-home-thumbSYNC.webp"
				alt="Synchrony home image"
			/>
		</div>
		<!-- Container with that organizes yellow otline and blue background blocks with its headers in a grid layout -->
		<h3 class="info-header">
			<span class="bold-blue">PAY OVER TIME WITH PROMOTIONAL FINANCING</span><br />
			WITH THE SYNCHRONY HOME CREDIT CARD.
		</h3>
		<div class="info__container">
			<!-- Yellow outline header block -->

			<!-- Yellow outline block with the 12-60 months and the promotional financing text -->
			<div class="info-content text-blue blue-outline">
				<h2 class="content__l-number text-blue">6</h2>
				<h2 class="content__months text-blue">MONTHS<sup>1</sup></h2>
				<h5 class="content__promo-financing text-blue">Promotional Financing</h5>
				<p class="content__text">on purchases of $299-$1,998.99</p>
			</div>

			<!-- Synchrony Arrows images -->

			<img
				class="synchrony-arrows lazyload"
				loading="lazy"
				src="${$synchImagesLink}/sync-arrows.webp"
				alt="Synchrony arrows"
			/>

			<!-- Blue background header block -->
			<!-- Blue background block with the 6 months and the promotional financing text -->
			<div class="info-content yellow-outline">
				<h2 class="content__l-number text-yellow">12</h2>
				<h2 class="content__months text-yellow">MONTHS<sup>1</sup></h2>
				<h5 class="content__promo-financing text-yellow">Promotional Financing</h5>
				<p class="content__text">on purchases of $1,999 or more</p>
			</div>
		</div>
	</section>
	<!-- container for Benefits of the Synchrony section with the credit card image at the bottom -->
	<section class="synchrony-benefits">
		<!-- IMPORTANT change the src of the credit card image for the one on your site's media assets. This is the mobile version so it would be the one with just the credit card -->
		<img
			class="f-mobile lazyload"
			loading="lazy"
			src="{synchImagesLink}/card.webp"
			alt="Synchrony card image"
		/>
		<h1 class="benefits__header">
			BENEFITS OF THE <span class="bold-blue"
				>SYNCHRONY HOME<sup>&trade;</sup><br />
				CREDIT CARD</span
			>
		</h1>
		<ul class="benefits__list two-columns">
			<li>
				6 Months Promotional Financing on purchases of $299-$1,998.99<sup>1</sup>
			</li>
			<li>
				12 Months Promotional Financing on purchases of $1,999 or more<sup>1</sup>
			</li>
			<li>Online account management and customer service</li>
			<li>
				No annual fee<sup>2</sup> and the ability to request a credit limit increase<sup>3</sup>
			</li>
			<li>$0 fraud liability and 24/7 secure account management</li>
			<li>
				A dedicated credit limit that can be used at thousands of Synchrony HOME partner locations
				nationwide to help you get what you want and need for your home*
			</li>
		</ul>
		<!-- IMPORTANT change the src of the credit card image for the one on your site's media assets This is the desktop version so it would be the one with the card at the left side and a big line accross the width -->
		<img
			class="f-desktop lazyload"
			loading="lazy"
			src="${$synchImagesLink}/card-imageSYNC.webp"
			alt="Synchrony card image"
		/>
	</section>
	<!-- Section with text in grey at the bottom of the benefits of the Synchrony element -->
	<section class="credit-approval">
		<p>
			<sup>1</sup>
			<strong
				>No Interest If Paid In Full Within 6 or 12 months on qualifying purchases with your
				Synchrony HOME Credit Card. 6 months on purchases of $299-$1,998.99 or 12 months on
				purchases of $1,999 or more. Interest will be charged to your account from the purchase date
				if the promotional balance is not paid in full within the promotional period. Minimum
				monthly payments required.</strong
			> Qualifying purchase amount must be on one receipt. No interest will be charged on the promo balance
			if you pay it off, in full, within the promo period. If you do not, interest will be charged on
			the promo balance from the purchase date. The required minimum monthly payments may or may not
			pay off the promo balance before the end of the promo period, depending on purchase amount, promo
			length and payment allocation. Regular account terms apply to non-promo purchases and, aöer promo
			period ends, to the promo balance. New Accounts as of 7/16/24: Purchase APR 34.99%. Penalty APR
			39.99%. Minimum Interest Charge $2. A promo fee will be charged equal to 2% of the amount financed
			on an equal payment no interest promotion of 18 months or more. Existing cardholders: See your
			credit card agreement terms. Subject to credit approval.
		</p>
		<p>
			<sup>2</sup> New Accounts as of 7/16/24: Purchase APR 34.99%. Penalty APR 39.99%. Minimum Interest
			Charge $2. A promo fee will be charged equal to 2% of the amount financed on an equal payment no
			interest promotion of 18 months or more. Existing cardholders: See your credit card agreement terms.
			Subject to credit approval
		</p>
		<p>
			<sup>3</sup> You may be required to provide your annual net income if we do not have your recent
			information on file. Your income will be used as a factor to determine eligibility for a credit
			limit increase.
		</p>
		<p>*Subject to credit approval.</p>
		<p>
			<a
				href="https://www.synchrony.com/financing/home/seasonal-offers"
				target="_blank"
				title="Click here for seasonal offers">Click Here</a
			> or see store for details.
		</p>
	</section>
	<!-- Section in blue background text and c2 in white and Synchrony word in yellos bold text -->
	<section class="synchrony-manage-account blue-background">
		<div class="manage-account__container">
			<div class="manage-account__info">
				<h5>
					MANAGE YOUR ACCOUNT WITH <span class="yellow-bold">SYNCHRONY</span>
				</h5>
				<p>
					Make payments, view your balance, update account information and schedule up to 12
					payments at a time.
				</p>
			</div>
			<div class="manage-account__c2a">
				<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
				<!-- VERY IMPORTANT Change this link for the one on your page, it will look the same but the code at the end varys -->
				<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
				<a href="https://www.mysynchrony.com${$synchUrlCode}" target="_blank" title="MANAGE ACCOUNT">MANAGE ACCOUNT</a>
			</div>
		</div>
	</section>
	<!-- Last section at the bottom with all the light blue blocks -->
	<section class="synchrony-qa">
		<!-- 1 -->
		<div class="light-blue-background">
			<h3 class="bold-blue">
				What is the ${$organizationName} Synchrony HOME<sup>&trade;</sup> Credit Card?
			</h3>
			<p>
				${$organizationName} offer customers a credit card through Synchrony Bank with a revolving credit
				limit to use again and again everywhere the Synchrony HOME Credit Card is accepted, including
				${$organizationName}
				locations.*
			</p>
			<small>*Subject to credit approval.</small>
		</div>
		<!-- 2 -->
		<div class="light-blue-background">
			<h3 class="bold-blue">
				How do I apply for a ${$organizationName} Synchrony HOME<sup>&trade;</sup> Credit Card?
			</h3>
			<p>
				You can apply for a ${$organizationName} Synchrony HOME Credit Card by applying online or at any
				Synchrony HOME retailer location. Click
				<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
				<!-- VERY IMPORTANT Change the location for your store's location -->
				<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
				<a href="/locations${$locationSlug}" title="Nearest Store Location"
					>here to apply online or here to find your nearest participating store location</a
				>
			</p>
		</div>
		<!-- 3 -->
		<div class="light-blue-background">
			<h3 class="bold-blue">How do I manage my account online?</h3>
			<p>
				To manage your ${$organizationName} Synchrony HOME Credit Card account online, click on the Manage
				My Account link above/below to go to the Synchrony Bank website. To logging in to your account,
				you will be able to:
			</p>
			<ul class="two-columns">
				<li>Make a payment.</li>
				<li>View your balance.</li>
				<li>Update your account information.</li>
				<li>Schedule up to 12 future payments.</li>
			</ul>
		</div>
		<!-- 4 -->
		<div class="light-blue-background">
			<h3 class="bold-blue">
				How can I make a payment on my ${$organizationName} Synchrony HOME<sup>&trade;</sup> Credit Card?
			</h3>
			<p>There are three convenient ways to pay your bill.</p>
			<div class="two-columns">
				<p>
					<strong>Pay Online:</strong>
					<!-- IMPORTANT verify this link but it usully the same one -->
					<a href="https://www.mysynchrony.com/mysyf/cmp-index.html" target="_blank">Click here</a> to manage your account
					and make payments online.
				</p>
				<p>
					<strong>Pay by Phone:</strong> Contact Synchrony Bank Customer Service 1-844-335-5909 during
					the hours listed below to make a payment by phone.
				</p>
				<p>
					<em>Monday - Sunday 7:30 am to 12:00 midnight EST</em>
				</p>
				<p>
					<strong>Pay by Mail:</strong> Mail payments to the address below. Ensure that you have plenty
					of time for your payment to arrive prior to the due date.
				</p>
				<p>
					Synchrony Bank<br />
					PO Box 960061<br />
					Orlando, FL 32896-0061
				</p>
			</div>
		</div>
	</section>
</article>`;
return synchText
})


export const synchronyCss = `/* container styling */
  .financing-section {
    font-family: sans-serif;
    max-width: 1440px;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 3rem;
  }
  /* Styles for every a tag or link in the section */
  .financing-section a{
    text-decoration: none;
    color: #0a6282;
    font-weight: 600;
  }
  /* Styles for every a tag or link in the section when hovered */
  .financing-section a:hover{
    color: #d6a80e;
  }

  /* These are the styles for the info main container where displays the 12-60 yellow outline block and the 6 blue background block */
  .synchrony-info {
    width: 100%;
    border-radius: 1.2rem;
    padding-top: 2.5rem;
    margin-top: 2.5rem;
    text-align: center;
    position: relative;
  }
  /* This let the top imge to be on top of the container outline with position absolute */
  .info__top-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  /* This class defines the grid layout for the information in the block */
  .info__container {
    padding: 5%;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: fit-content(100%);
  }
  /* Set a yellow outline around the block */
  .yellow-outline {
    outline: #fac40b solid 0.2rem;
    outline-offset: -0.2rem;
  }
  /* set color blue for every blue text in the page */
  .text-blue {
    color: #0a6282;
  }
  /* Set the background color for the blue block */
  .blue-background {
    background-color: #0a6282;
    color: #fff;
  }
  /* Styales for headers section on top of yellow out and blue back blocks */
  .info-header {
    font-size: 1.6rem;
    height: 100%;
    margin-top: 1rem;
    margin-bottom: 0.6rem;
    grid-row: 1/2;
    font-weight: 700;
  }
  /* This class sets padding, radius and grid position for the big number blocks */
  .info-content {
    border-radius: 1.2rem;
    padding: 1rem;
    grid-row: 2/3;
    /* height: 100%; */
  }
  /* This makes the styles for the large numbers in the blocks */
  .content__l-number {
    font-size: 4rem;
    font-weight: 700;
    margin: 1rem;
  }
  /* This makes the styles for the months in the blocks */
  .content__months {
    font-size: 2rem;
    font-weight: 800;
  }
  /* This are the styles fot the container that starts with Benefits of the Sybrony home */
  .synchrony-benefits {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: fit-content(100%) 2fr;
    font-size: 0.9rem;
  }
  /* Large lettering in the benefits container */
  .benefits__header {
    margin-top: 0;
    grid-column: 1/2;
    grid-row: 1/2;
    font-size: 1.6rem;
  }
  /* Set styles for those text with blue bold text */
  .blod-blue {
    color: #0a6282;
    font-weight: 700;
  }
  /* These are the items that list the conditions for financing */
  .benefits__list {
    grid-column: 2/4;
    grid-row: 1/3;
  }
  /* This class display in two columns the list of benefits */
  .two-columns {
    columns: 2; 
    column-gap: 3em;
  }
  /* Set styles for the image in the benefits container */
  .synchrony-benefits img {
    grid-column: 1/4;
    grid-row: 2/3;
  }
  /* Set the stiles for the element at the bottom of the benefits section in a grey font */
  .credit-approval {
    font-size: 0.8rem;
    margin-inline: 3rem;
    color: #777777;
  }
  /* Styles for the section with blue background and whit call to action that says "APPLY NOW" */
  .synchrony-manage-account {
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
  .manage-account__container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem 4rem;
    margin: auto;
  }
  .manage-account__info {
    max-width: 40rem;
    margin-right: 2rem;
    display: block;
  }
  .manage-account__info p:last-child {
    margin: 0;
  }
  .yellow-bold {
    font-weight: 700;
    color: #fac40b;
  }
  /* Styles for the call to action in the Manage block */
  .manage-account__c2a a{
    display: block;
    width: max-content;
    text-align: center;
    border: solid 0.2rem #fff;
    padding: 0.5rem 1rem;
    color: #fff;
    font-weight: 500;
  }
  /* hover Styles for the call to action in the Manage block */
  .manage-account__c2a a:hover {
    background-color: #fff;
    color: #0a6282;
  }
  /* This class set the light blue background for every item in the qa section at the bottom oth the page */
  .light-blue-background {
    background-color: #deedef;
    padding: 2rem;
    border-radius: 1rem;
    margin-bottom: 2rem;
  }
  .f-desktop {
    width: 100%;
    display: block;
  }
  .f-mobile {
    display: none;
  }
  @media (max-width: 768px) {
    .financing-section {
      gap: 3rem;
    }
    .f-desktop {
      display: none;
    }
    .f-mobile {
      display: block;
      width: 100%;
    }
    .info__container {
      grid-template-columns: 1fr;
      grid-auto-flow: column;
    }
    
    .info-header {
      grid-column: 1/2;
      grid-row: auto;
    }
    .info-content {
      grid-column: 1/2;
      grid-row: auto;
    }
    .synchrony-benefits {
      grid-template-columns: 1fr;
      grid-template-rows: fit-content(100%);


    }
    .benefits__header {
      grid-column: 1/2;
      grid-row: auto;
    }
    .benefits__list {
      grid-column: 1/2;
      grid-row: auto;
    }
    .synchrony-benefits img {
      grid-column: 1/2;
      grid-row: auto;
    }
    .two-columns {
      columns: 1;
    }
    .credit-approval {
      text-align: center;
    }
    .manage-account__container {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;
      padding: 4rem;
    }
    .manage-account__container > * {
      margin: 0;
    }
  }
`

export const epicProtecHtml = derived(epicProImg, ($epicProImg) => {
  let epicProtectText = `<div class="p-plan--container p-plan--style">
  <!-- heading section -->
  <div class="p-plan--division01 p-plan--division">
    <section class="p-plan--header">
      <!-- Top section left column -->
      <div class="header-section__epic">
        <div class="header-section__epic-title">
          <img src="${$epicProImg}/epic-logo.webp" alt="Epic logo">
          <h1 class="fw-bold">EPIC PROTECT PLANS</h1>
        </div>
        <img class="header-section__epic-image" src="${$epicProImg}/laptop.webp" alt="Laptop image">
      </div>
      <!-- Top section right column "Here for you" -->
      <div class="header-section__here4you">
        <h2 class="p-plan--text-blue fw-bold">We're here for you if something goes wrong.</h2>
        <p class="p-plan--text">Our service plans can eliminate unexpected, out of pocket expenses for repairs with affordable coverage you can trust beyond the original warranty. It's peace of mind protection you can count on!</p>
        <div class="header-section--btns section--btns">
          <a class="p-plan--c2a-btn" href="https://epicprotect.com/nationwide" target="_blank">Learn More</a>
          <a class="p-plan--btn" href="tel:1-800-452-3599">Call to file a claim</a>
        </div>
      </div>
    </section>
    <!-- Protection Plans By Category section -->
    <section class="p-plan--by-category p-plan--section">
      <h2 class="p-plan--title p-plan--text-blue text-center by-category__title">Protection Plans By Category</h2>
      <div class="dashline-under--center"></div>  
      <!-- By Category selector >>>>>>>>>>>>>>>>>>>>>>> -->
      <div class="by-category__selector">
        <ul class="by-category__list">
          <li class="by-category__item active" id="tab-1">
            <img src="${$epicProImg}/category-refrigerator.webp" alt="Refrigerator category image">
            <h5>Refrigerators</h5>
          </li>
          <li class="by-category__item" id="tab-2">
            <img src="${$epicProImg}/category-washers-dryers.webp" alt="Refrigerator category image">
            <h5>Washers & Dryers</h5>
          </li>
          <li class="by-category__item" id="tab-3">
            <img src="${$epicProImg}/category-microwaves.webp" alt="Refrigerator category image">
            <h5>Microwaves</h5>
          </li>
          <li class="by-category__item" id="tab-4">
            <img src="${$epicProImg}/category-dishwashers.webp" alt="Refrigerator category image">
            <h5>Dishwashers</h5>
          </li>
          <li class="by-category__item" id="tab-5">
            <img src="${$epicProImg}/category-ranges.webp" alt="Refrigerator category image">
            <h5>Ranges</h5>
          </li>
          <li class="by-category__item" id="tab-6">
            <img src="${$epicProImg}/category-ovens.webp" alt="Refrigerator category image">
            <h5>Ovens</h5>
          </li>
          <li class="by-category__item" id="tab-7">
            <img src="${$epicProImg}/category-air-conditioners.webp" alt="Refrigerator category image">
            <h5>Air Conditioners</h5>
          </li>
        </ul>
      </div>
      <!-- By Category content -->
      <div class="bycategory--wrapper">
        <div class="by-category__content active" id="tab-1">
          <div class="by-category__content-text">
            <h3 class="p-plan--text-blue">Refrigerators</h3>
            <p>EPIC Protect offers comprehensive protection including up to $300 for food loss coverage. We also cover functional components like shelves and bins. Don't risk a minute of downtime from the refrigerator you rely on!</p>
          </div>
          <img src="${$epicProImg}/protection-plan-refrigerators.webp" alt="Refrigerator image">
        </div>
        <div class="by-category__content" id="tab-2">
          <div class="by-category__content-text">
            <h3 class="p-plan--text-blue">Washers & Dryers</h3>
            <p>EPIC Protect offers comprehensive protection including up to $50 laundry credit. We'll get you back up and running fast when unexpected repairs are needed. So you can return to doing what you love.</p>
          </div>
          <img src="${$epicProImg}/protection-plan-washers-dryers.webp" alt="Refrigerator image">
        </div>
        <div class="by-category__content" id="tab-3">
          <div class="by-category__content-text">
            <h3 class="p-plan--text-blue">Microwaves</h3>
            <p>EPIC Protect provides fast and easy service that covers all parts and labor with no deductibles. We cover functional components like racks, wheels, rollers and handles. We'll get you back up and running if unexpected repairs are needed.</p>
          </div>
          <img src="${$epicProImg}/protection-plan-microwaves.webp" alt="Refrigerator image">
        </div>
        <div class="by-category__content" id="tab-4">
          <div class="by-category__content-text">
            <h3 class="p-plan--text-blue">Dishwashers</h3>
            <p>You don't want a minute of downtime from the appliances you rely on. EPIC Protect will get you back up and running fast when unexpected repairs are needed. So you can return to doing what you love.</p>
          </div>
          <img src="${$epicProImg}/protection-plan-dishwashers.webp" alt="Refrigerator image">
        </div>
        <div class="by-category__content" id="tab-5">
          <div class="by-category__content-text">
            <h3 class="p-plan--text-blue">Ranges</h3>
            <p>EPIC Protect provides fast and easy service that covers all parts and labor with no deductibles. We cover functional components like racks, wheels, rollers and handles. We'll get you back up and running if unexpected repairs are needed.</p>
          </div>
          <img src="${$epicProImg}/protection-plan-ranges.webp" alt="Refrigerator image">
        </div>
        <div class="by-category__content" id="tab-6">
          <div class="by-category__content-text">
            <h3 class="p-plan--text-blue">Ovens</h3>
            <p>EPIC Protect provides fast and easy service that covers all parts and labor with no deductibles. We cover functional components like racks, wheels, rollers and handles. We'll get you back up and running if unexpected repairs are needed.</p>
          </div>
          <img src="${$epicProImg}/protection-plan-ovens.webp" alt="Refrigerator image">
        </div>
        <div class="by-category__content" id="tab-7">
          <div class="by-category__content-text">
            <h3 class="p-plan--text-blue">Air Conditioners</h3>
            <p>You don't want a minute of downtime from the appliances you rely on. EPIC Protect will get you back up and running fast when unexpected repairs are needed. So you can return to doing what you love.</p>
          </div>
          <img src="${$epicProImg}/protection-plan-air-conditioning.webp" alt="Refrigerator image">
        </div>
      </div>
    </section>
  </div>
  <!-- division 2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> -->
  <div class="p-plan--division02 p-plan--division">
    <!-- Additional Features and Benefits section >>>>>>>>>>>>>>>>>> -->
    <section class="p-plan--features-n-benefits p-plan--section">
      <img class="p-plan--title-icon" src="${$epicProImg}/icon-umbrella.webp" alt="Umbrella icon">
      <h2 class="p-plan--title p-plan--text-blue text-center">Additional Features and Benefits Include:*</h2>
      <span class="features-n-benefits__terms-link">
        <a class="p-plan--text-link" href="${$epicProImg}/epic_protect_t_and_c_2020.pdf" target="_blank">*See Terms and Conditions</a>
      </span>
      <div class="dashline-under--center"></div>
      <div class="features-n-benefits__items">
        <!-- Item 1 -->
        <div class="features-n-benefits__item">
          <img src="${$epicProImg}/icon-no-lemons.webp" alt="Lemon icon">
          <h4 class="features-n-benefits__title">No Lemon Benefit</h4>
          <div class="features-n-benefits--wrapper">
            <div class="dashline-under--center"></div>
          </div>
          <p>For the same failure 3 times, by the 4th time it is replaced.</p>
        </div>
        <!-- Item 2 -->
        <div class="features-n-benefits__item">
          <img src="${$epicProImg}/icon-power-surge.webp" alt="Lightning icon">
          <h4 class="features-n-benefits__title">Power Surge Protection</h4>
          <div class="features-n-benefits--wrapper">
            <div class="dashline-under--center"></div>
          </div>
          <p>For all covered products.</p>
        </div>
        <!-- Item 3 -->
        <div class="features-n-benefits__item">
          <img src="${$epicProImg}/icon-parts.webp" alt="Gear icon">
          <h4 class="features-n-benefits__title">Functional Parts Coverage</h4>
          <div class="features-n-benefits--wrapper">
            <div class="dashline-under--center"></div>
          </div>
          <p>Coverage for knobs, racks, and doorknobs.</p>
        </div>
        <!-- Item 4 -->
        <div class="features-n-benefits__item">
          <img src="${$epicProImg}/icon-laundry.webp" alt="Laundry icon">
          <h4 class="features-n-benefits__title">Laundry & Food Loss Benefits</h4>
          <div class="features-n-benefits--wrapper">
            <div class="dashline-under--center"></div>
          </div>
          <p>Specified amount coverages for the life of the contract.</p>
        </div>
        <!-- Item 5 -->
        <div class="features-n-benefits__item">
          <img src="${$epicProImg}/icon-arrow.webp" alt="Arrow icon">
          <h4 class="features-n-benefits__title">Eligible for Transfer</h4>
          <div class="dashline-under--center"></div>
          <p>The coverage moves with you or can be transferred to a new owner.</p>
        </div>
      </div>
    </section>
    <!-- The protection you expect, the service you deserve. -->
    <section class="p-plan--protection-u-expect p-plan--section">
      <img class="protection-u-expect--image" src="${$epicProImg}/why-choose-toll-free-customer-service.webp" alt="Customer service photo">
      <div class="protection-u-expect--content">
        <img class="p-plan--title-icon" src="${$epicProImg}/icon-shield.webp" alt="Protect your home image">
        <h2 class="p-plan--title p-plan--text-blue">The protection you expect, the service you deserve.</h2>
        <div class="dashline-under--left"></div>
        <p>When a problem arises and service is required, you need it fixed as fast as possible. But then you're faced with a costly repair bill. Are you and your budget prepared? Especially when you have no way of knowing when or how often service may be needed.</p>
        <div class="protection-u-expect--btns section--btns">
          <a class="p-plan--c2a-btn" href="https://epicprotect.com/nationwide" target="_blank">Learn More</a>
          <a class="p-plan--btn" href="tel:1-800-452-3599">Call Now</a>
        </div>
      </div>
    </section>
  </div>
  <!-- Division 3 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> -->
  <div class="p-plan--division03 p-plan--division">
    <!-- EPIC Protect Coverage Period section -->
    <section class="p-plan--epic-coverage p-plan--section">
      <div class="epic-coverage--content">
        <img class="p-plan--title-icon" src="${$epicProImg}/icon-calendar.webp" alt="Callendar icon">
        <h2 class="p-plan--title p-plan--text-blue">EPIC Protect Coverage Period</h2>
        <div class="dashline-under--left"></div>
        <p>EPIC Protection Plans offers years of coverage. Day one coverages include:</p>
        <div class="epic-coverage__include-items">
          <div class="epic-coverage__include-item">
            <img src="${$epicProImg}/icon-power-surge-coverage.webp" alt="Lightning icon">
            <p>Power Surges</p>
          </div>
          <div class="epic-coverage__include-item">
            <img src="${$epicProImg}/icon-food.webp" alt="Lightning icon">
            <p>Food Lost</p>
          </div>
          <div class="epic-coverage__include-item">
            <img src="${$epicProImg}/icon-laundry-benefit.webp" alt="Lightning icon">
            <p>Laundry Benefit</p>
          </div>
        </div>
      </div>
      <img class="epic-coverage--image" src="${$epicProImg}/bar-chart-coverage.webp" alt="MFG Warranty graphic">
    </section>
    <!-- Cost Savings section -->
    <section class="p-plan--cost-savings p-plan--section">
      <div class="cost-savings--elements">
        <!-- Cost Savings element Electronics -->
        <div class="cost-savings--element">
          <h3>Cost Savings - Electronics</h3>
          <ul>
            <li>
              <img src="${$epicProImg}/key-average-repair-costs.webp" alt="Lightning icon">
              <p>Average Repair Costs</p>
            </li>
            <li>
              <img src="${$epicProImg}/key-average-replacement-costs.webp" alt="Lightning icon">
              <p>Average Replacement Costs</p>
            </li>
            <li>
              <img src="${$epicProImg}/key-average-service-contract-price.webp" alt="Lightning icon">
              <p>Average Service Contract Price</p>
            </li>
          </ul>
          <img src="${$epicProImg}/bar-chart-cost-savings.webp" alt="Pricing chart">
        </div>
        <!-- Cost Savings element Appliances -->
        <div class="cost-savings--element">
          <h3>Cost Savings - Appliances</h3>
          <ul>
            <li>
              <img src="${$epicProImg}/key-average-repair-costs.webp" alt="Lightning icon">
              <p>Average Repair Costs</p>
            </li>
            <li>
              <img src="${$epicProImg}/key-average-replacement-costs.webp" alt="Lightning icon">
              <p>Average Replacement Costs</p>
            </li>
            <li>
              <img src="${$epicProImg}/key-average-service-contract-price.webp" alt="Lightning icon">
              <p>Average Service Contract Price</p>
            </li>
          </ul>
          <img src="${$epicProImg}/bar-chart-cost-appliances.webp" alt="Pricing chart">
        </div>
      </div>
      <p>Service and protection with one simple call! Our Toll Free Number puts you in touch with a customer care representative 24/7/365. Call <a class="p-plan--text-link" href="tel:1-800-452-3599">1.800.452.3599</a> or find out more at <a class="p-plan--text-link" href="https://myepicprotect.com/" target="_blank">myepicprotect.com</a>. You can also visit your local retailer and ask about extended service and protection for your valued products.</p>
      <a class="p-plan--c2a-btn" href="${$epicProImg}/epic_protect_t_and_c_2020.pdf" target="_blank">View Terms and Conditions</a>
    </section>
  </div>
  <div class="p-plan--division04 p-plan--division">
    <section class="p-plan--common-questions p-plan--section">
      <div class="common-questions--wrapper">
        <img class="p-plan--title-icon" src="${$epicProImg}/icon-questions.webp" alt="Q icon">
        <h2 class="p-plan--title">Common Questions</h2>
        <div class="dashline-under--center"></div>
        <div class="common-questions-contents">
          <!-- Common Question 1 -->
          <div class="common-question">
            <h4>What items are eligible for EPIC Protect?</h4>
            <div class="dashline-under--left"></div>
            <p>Each of your covered appliance(s)/electronic(s) are eligible for coverage resulting from mechanical & electrical failures. The coverage includes labor cost and trip charges to your home so you pay nothing out of pocket.</p>
          </div>
          <!-- Common Question 2 -->
          <div class="common-question">
            <h4>How do I file a claim?</h4>
            <div class="dashline-under--left"></div>
            <p>You can call us at <a class="p-plan--text-link" href="tel:800.452.3599">800-452-3599</a> anytime - 24 hours a day, 7 days a week, 365 days a year.</p>
          </div>
          <!-- Common Question 3 -->
          <div class="common-question">
            <h4>When does the plan begin?</h4>
            <div class="dashline-under--left"></div>
            <p>All plans begin from date of purchase and are inclusive of the manufacturer's limited warranty. Benefits such as power surge coverage and Accidental Damage from Handling (if purchased) begin Day 1.</p>
          </div>
          <!-- Common Question 4 -->
          <div class="common-question">
            <h4>What is the limit of liability?</h4>
            <div class="dashline-under--left"></div>
            <p>EPIC Protect is a full value program. The limit of liability for each claim is the retail price of the product.</p>
          </div>
          <!-- Common Question 5 -->
          <div class="common-question">
            <h4>Do I need to register EPIC Protect?</h4>
            <div class="dashline-under--left"></div>
            <p>EPIC Protect is ready to go at the time of purchase! No registration is required.</p>
          </div>
          <!-- Common Question 6 -->
          <div class="common-question">
            <h4>How does my product get serviced?</h4>
            <div class="dashline-under--left"></div>
            <p>Electronics under $800 and appliances under $300 are replaced. All others are serviced through onsite, carry-in and depot service. If we can't repair it, we will replace it!</p>
          </div>
        </div>
      </div>
      <img class="common-questions--image" src="${$epicProImg}/appliances-under-umbrella.webp" alt="
appliances under umbrella">
    </section>
  </div>
</div>
`;
  return epicProtectText
})

export const epicProtecCss = derived(epicProImg, ($epicProImg) => {
  let epicProtectCss = `body {
    margin: 0;
  }
  /* Default Styles */
  .p-plan--style {
    --accent-color: #3cadee;
    --text-color: #222222;
    font-size: 150%;
    color: var(--text-color);
    font-family: sans-serif;
    background-color: #fff;
  }
  /* text blue */
  .p-plan--text-blue {
    color: #2c576f;
  }
  .p-plan--title {
    margin: 0;
    font-weight: 800;
  }
  .p-plan--title-icon {
    display: inline-block;
    width: rem;
    height: auto;
    margin-bottom: 1rem;
  }
  /* Call to action and default butons */
  .p-plan--c2a-btn, .p-plan--btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: fit-content;
    min-width: 16rem;
    padding: 0.5rem 2rem;
    border-radius: 30rem;
    text-decoration: none;
    font-weight: 700;
    transition: 0.3s ease-in-out;
    &:hover {
      transform-origin: center;
      text-decoration: underline;
    }
  }
  .p-plan--text-link{
    color: #3cadee;
  }
  .p-plan--c2a-btn {
    background-color: var(--accent-color);
    color: #fff;
  }
  .p-plan--btn {
    background-color: #fff;
    color: var(--text-color);
    border: 1px solid var(--text-color);
  }
  .section--btns {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-block: 4rem 2rem;
    @media screen and (max-width: 1005px) {
      flex-direction: column;
      align-items: center;
    }
  }
  /* This class is the blue separetor in center >>>>>>>>>>>>>>>>> */
  .dashline-under--center {
    border: solid 0.1rem var(--accent-color);
    display: block;
    background-color: var(--accent-color);
    height: 0.3rem;
    width: 4rem;
    margin-inline: auto;
    margin-block: 1rem;
    border-radius: 30rem;
  }
  .dashline-under--left{
    border: none;
    display: block;
    background-color: var(--accent-color);
    height: 0.3rem;
    width: 4rem;
    margin-inline: 0 auto;
    margin-block: 1rem;
    border-radius: 30rem;
  }

  /* Division tyles backgaround control >>>>>>>>>>>>>>>>>>>>>>>> */
  /* First division integrating first two sections */ 
  .p-plan--division {
    margin: 0;
    position: relative;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: top right ;
    padding-inline: 1rem;
    @media screen and (min-width: 1005px) {
      backface-visibility: hidden;
    }
  }
  /* Background blue wave */
  .p-plan--division01 {
    /* isolation: isolate; */
    background-image: url("${$epicProImg}/bg-blue-wave-1.svg");
    background-position: top 0% left -50%;
    background-size: 68%;  
  }
  .p-plan--division02 {
    background-image: url("${$epicProImg}/bg-blue-wave-2.svg");
  }
  .p-plan--division03 {
    background-image: url("${$epicProImg}/bg-blue-wave-3.svg");
    background-position: top 0% left -50%;
    background-size: 50% 50%;  
  }
  .p-plan--division04 {
    background-image: url("${$epicProImg}/bg-blue-wave-4.svg");
  }

  /* En of division background control >>>>>>>>>>>>>>>>>>>> */
  .p-plan--section {
    max-width: 1400px;
    margin-inline: auto;
    margin-block: 5rem;
    padding: 3rem 0.5rem;
  }
  /* Fist heading section */
  .p-plan--header {
    max-width: 1600px;
    margin-inline: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    gap: 2rem;
    margin-block: 0rem;
    & > * {
      width: 100%;
    }
  }
  .p-plan--header .header-section__epic-title {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: 2rem;
  }
  .p-plan--header .header-section__epic-title img {
    width: auto;
    height: 7rem;
  }
  .header-section__epic-image {
    width: 100%;
    margin-inline: auto;
  }
  .header-section__here4you h2 {
    text-shadow: #fff 0rem 0 1.4rem;
  }
  /* Protection Plans By Category >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  .p-plan--by-category {
    padding-bottom: 0;
    margin-block: 0;
  }
  /* This classes set the layout for the category selector */
  .p-plan--by-category .by-category__selector ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(7, 10rem);
    gap: 2rem;
    align-items: center;
    justify-items: center;
    justify-content: center;
    text-align: center;
    overflow-x: scroll;
    scrollbar-width: none;
    & > * {
      width: fit-content;
      cursor: pointer;
      & > * {
        pointer-events: none;
      }
    }
  }
  .p-plan--by-category .by-category__selector ul h5 {
    display: inline-block;
    font-size: 1rem;
    font-weight: 800;
    width: 100%;
  }
  .p-plan--by-category .by-category__selector .active::after {
    content: "";
    display: block;
    background-color: var(--accent-color);
    height: 0.3rem;
    width: 100%;
    border-radius: 30rem;
  }
  .by-category__content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    gap: 2rem;
    width: 100%;
    & > * {
      width: 100%;
    }
    & > div {
      width: 100%;
      padding: 2rem;
    }
    & h3 {
      font-size: 2rem;
    }
    & > img {
      width: 100%;
      height: auto;
      flex: 1;
    }
  }
  /* This class use to hide the content when not active */
  .by-category__content:not(.active) {
    display: none;
  }

  /* Aditional Featyres and benefits >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  .p-plan--features-n-benefits {
    background-color: #f9f9f9;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 0;
    & > .p-plan--title-icon {
      /* Change the width to change the images size */
      height: auto;
      margin-inline: auto;
    }
    & > h2 { 
      margin-top: 2rem;
    }
  }
  .features-n-benefits__terms-link {
    display: block;
    text-align: center;
    font-size: 0.8rem;
    margin-block: 1rem;
  }
  .features-n-benefits__items {
    margin-block: 2rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr repeat(3, auto);
    align-items: center;
    justify-items: center;
    text-align: center;
    column-gap: 1rem;
    row-gap: 0.5rem;
    width: calc(100% - 2rem);
    margin-inline: auto;
  }
  .features-n-benefits__item {
    --fnb-sides-padding: 10%;
    grid-row: span 4;
    grid-column: span 1;
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: subgrid;
    row-gap: 1rem;
    align-items: start;
    justify-items: center;
    padding: var(--fnb-sides-padding);
    border-radius: 0.4rem;
    box-shadow:  0 0.5rem 1rem rgb(0 0 0 / .15);
    margin-bottom: 1rem;
    & img {
      width: 100%;  
      max-height: 6rem;
      object-fit: contain;
      margin-bottom: 1rem;
    }
    & h4 {
      margin: 0;
      align-self: center;
    }
    & p {
      margin: 0;
      height: 100%;
    }
  }
  .features-n-benefits--wrapper {
    height: fit-content;
    width: fit-content;
    margin: auto;
  }
  /* The protection you expect Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
  .p-plan--protection-u-expect, .p-plan--epic-coverage, .cost-savings--elements {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    gap: 4rem;
    /* margin-block: 7rem; */
  }
  .protection-u-expect--content{
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
  }
  .protection-u-expect--image , .epic-coverage--content {
    width: 100%;
    height: 100%;
    object-fit: cover;
    order: 2;
  }
  /* Division 3 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  /* EPIC Protect Coverage Period >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  .epic-coverage--content{
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
  }
  .epic-coverage__include-items{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    align-items: center;
    justify-items: center;
    gap: 2rem;
  }
  .epic-coverage__include-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 0 0.7rem 0 #e9e9e9;
    width: 100%;
    height: 100%;
    & > * {
      margin: 1rem;
    }
  }
  .epic-coverage--image {
    width: 100%;
    height: auto;
  }
  /* Cost Savings >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  .p-plan--cost-savings {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    & h3 {
      font-weight: 800;
    }
  }
  .p-plan--cost-savings > .p-plan--c2a-btn {
    width: fit-content;
  }
  .cost-savings--element ul {
    width: fit-content;
    
  }
  .cost-savings--element ul li {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    & img {
      object-fit: contain;
    }
  }
  .cost-savings--element > img {
    width: 100%;
  }
  /* Division 4 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  /* Common Questions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  .p-plan--common-questions {
    --cq-bottom-displacement: 10rem;
  }
  .common-questions--wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    padding: 2rem;
    border-radius: 2rem;
    padding-bottom: calc(var(--cq-bottom-displacement) + 2rem);
    &  h4 {
      font-weight: 800;
    }
  }
  .common-questions-contents {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: start;
    justify-items: center;
    gap: 2rem;
  }
  .common-questions--image {
    display: block;
    width: 100%;
    max-width: 60rem;
    height: auto;
    object-fit: contain;
    margin-top: calc(var(--cq-bottom-displacement) * -1);
    margin-inline: auto;
    /* margin-bottom: 2rem; */
  }
  /* Media queries >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
  @media (max-width: 1005px) { 
    .p-plan--style {
      font-size: 100%;
    }
    .p-plan--division02 , .p-plan--division03 , .p-plan--division04 {
      background-image: none;
    }
    .p-plan--division01 {
      background-size: 100%;
      background-image:linear-gradient(to bottom , #ffffff46 12%, #fff 20%), url("${$epicProImg}bg-blue-wave-1.svg");

      background-blend-mode: normal;
    }
    .p-plan--header, .by-category__content , .features-n-benefits__items, .p-plan--protection-u-expect, .p-plan--epic-coverage, .epic-coverage__include-items, .cost-savings--elements, .common-questions-contents  {
      grid-template-columns: 1fr;
      align-items: center;
    }
    .p-plan--title  {
      font-size: 100%;
    }
    .p-plan--c2a-btn, .p-plan--btn {
      display: inline-block;
      width: calc(100% - 4rem);
      margin-inline: 1rem;
    }

    .p-plan--header .header-section__epic-title img {
      height: 7vw;
    }
    .header-section__epic-title h1 {
      font-size: 5vw;
    }
    .p-plan--by-category .by-category__selector ul { 
      justify-content: start;
    }
    .protection-u-expect--image , .epic-coverage--content {
      order: 0;
    }
    .epic-coverage__include-items {
      width: fit-content;
      justify-content: center;
      margin-inline: auto;
    }
    .features-n-benefits__items {
      display: flex;
      flex-direction: column;
      & > * {
        width: calc(100% - var(--fnb-sides-padding) * 2);

      }
    }
  }`;
  return epicProtectCss;
})


export const epicProtecJs = `const headersInteractives = () => {
  const headerEls = document.querySelectorAll('.by-category__item');
  headerEls.forEach((el) => {
    el.addEventListener('click', (event) => {
      // remove active class elements
      const activeEls = document.querySelectorAll('.active');
      activeEls.forEach((activeEl) => {
        activeEl.classList.remove('active');
      });
      // get the target id and add active classes
      const targetId = event.target.id;
      const targetEls = document.querySelectorAll('#' + targetId);
      targetEls.forEach((targetEl) => {
        targetEl.classList.add('active');
      });
    });
  });
};
headersInteractives();`