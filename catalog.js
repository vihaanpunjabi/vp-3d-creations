/* =========================================================================
   catalog.js — the gallery contents for each specialty.

   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD PRINTS.

   To add one, copy a block and fill it in:

       {
         img:   'assets/img/gallery/art-05.jpg',   // put the photo in that folder
         name:  'Dark Side of the Moon',           // what it is
         price: '$45.00',                          // what you charge for it
         desc:  'Four-colour relief, 220 mm.'      // one line about it
       },

   Notes
   - Keep the comma after each closing brace except the last one.
   - Any image format works (.jpg, .png, .webp, .svg). Roughly 4:3 looks best.
   - Delete the placeholder entries as you replace them; the gallery sizes
     itself to however many you have, and shows a message when a list is empty.
   ========================================================================= */
window.CATALOG = {

  art: {
    title: 'Album covers',
    blurb: 'Every album cover I have printed.',
    items: [
      { img: 'assets/img/gallery/album-04.jpg', name: 'Don Toliver — Life of a DON', price: '$XX.XX', desc: 'NA' },
      { img: 'assets/img/gallery/album-03.jpg', name: 'I AM MUSIC', price: '$XX.XX', desc: 'NA' },
      { img: 'assets/img/gallery/album-02.jpg', name: 'Album print on the plate', price: '$XX.XX', desc: 'NA' },
      { img: 'assets/img/gallery/album-01.jpg', name: 'Five-print wall set', price: '$XX.XX', desc: 'NA' }
    ]
  }

};
