
//LOADING THE UI WITH DEFAULT DISPLAY/VIEW
//http://host:5555/?display=display_name&display_type=display_type

// display_name: the name of the display
// For projects use the name of the display
// For custom views use the name specified in the menus.json file

// display_type: the type of display
// Possible values are svg, html, svg_user, html_user
// svg: displays in a project
// html: default html views such as users, alarms and system monitor
// svg_user: user managed svg views
// html_user: user managed html views

// NOTE:
// Ensure default views have view access level of zero (0)



//LOADING THE UI WITH DEFAULT SEQUENCE
//http://host:5555/?sequence=sequence_id

// sequence_id: the id of the sequence in the display_sequence.json file

// NOTE:
// Specify a login username and password in the  sequence file display_sequence for sequences involving protected views (view access levels greater than zero)







