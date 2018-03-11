-- ###################
-- Truncate all tables
-- ###################
truncate table shortcut_keystrokes cascade;
truncate table training_followed cascade;
truncate table question cascade;
truncate table command cascade;
truncate table exercise_visited cascade;
truncate table exercise cascade;
truncate table training cascade;
truncate table training_type cascade;
truncate table opponent cascade;
truncate table keystroke cascade;
truncate table shortcut cascade;

-- Remove newly created user
delete from jhi_user where login='user2';

-- ###################
-- Populate all tables
-- ###################

-- #####
-- Populate table keystroke
-- #####
insert into keystroke(id, jhi_label, js_code) values(1,'F1',112);
insert into keystroke(id, jhi_label, js_code) values(2,'F2',113);
insert into keystroke(id, jhi_label, js_code) values(3,'F3',114);
insert into keystroke(id, jhi_label, js_code) values(4,'F4',115);
insert into keystroke(id, jhi_label, js_code) values(5,'F5',116);
insert into keystroke(id, jhi_label, js_code) values(6,'F6',117);
insert into keystroke(id, jhi_label, js_code) values(7,'F7',118);
insert into keystroke(id, jhi_label, js_code) values(8,'F8',119);
insert into keystroke(id, jhi_label, js_code) values(9,'F9',120);
insert into keystroke(id, jhi_label, js_code) values(10,'F10',121);
insert into keystroke(id, jhi_label, js_code) values(11,'F11',122);
insert into keystroke(id, jhi_label, js_code) values(12,'F12',123);

insert into keystroke(id, jhi_label, js_code) values(13,'Esc',27);
insert into keystroke(id, jhi_label, js_code) values(14,'²',222);

insert into keystroke(id, jhi_label, js_code) values(15,'1',49);
insert into keystroke(id, jhi_label, js_code) values(16,'2',50);
insert into keystroke(id, jhi_label, js_code) values(17,'3',51);
insert into keystroke(id, jhi_label, js_code) values(18,'4',52);
insert into keystroke(id, jhi_label, js_code) values(19,'5',53);
insert into keystroke(id, jhi_label, js_code) values(20,'6',54);
insert into keystroke(id, jhi_label, js_code) values(21,'7',55);
insert into keystroke(id, jhi_label, js_code) values(22,'8',56);
insert into keystroke(id, jhi_label, js_code) values(23,'9',57);
insert into keystroke(id, jhi_label, js_code) values(24,'0',48);

insert into keystroke(id, jhi_label, js_code) values(25,')',219);
insert into keystroke(id, jhi_label, js_code) values(26,'=',187);
insert into keystroke(id, jhi_label, js_code) values(27,'Backspace',8);

insert into keystroke(id, jhi_label, js_code) values(28,'Inser',45);
insert into keystroke(id, jhi_label, js_code) values(29,'Delete',46);
insert into keystroke(id, jhi_label, js_code) values(30,'Page up',33);
insert into keystroke(id, jhi_label, js_code) values(31,'Page down',34);
insert into keystroke(id, jhi_label, js_code) values(32,'End',35);
insert into keystroke(id, jhi_label, js_code) values(33,'Home',36);

insert into keystroke(id, jhi_label, js_code) values(34,'Num lock',144);
insert into keystroke(id, jhi_label, js_code) values(35,'Num /',111);
insert into keystroke(id, jhi_label, js_code) values(36,'Num *',106);
insert into keystroke(id, jhi_label, js_code) values(37,'Num -',109);
insert into keystroke(id, jhi_label, js_code) values(38,'Num +',107);
insert into keystroke(id, jhi_label, js_code) values(39,'Num .',110);
insert into keystroke(id, jhi_label, js_code) values(40,'Num 0',96);
insert into keystroke(id, jhi_label, js_code) values(41,'Num 1',97);
insert into keystroke(id, jhi_label, js_code) values(42,'Num 2',98);
insert into keystroke(id, jhi_label, js_code) values(43,'Num 3',99);
insert into keystroke(id, jhi_label, js_code) values(44,'Num 4',100);
insert into keystroke(id, jhi_label, js_code) values(45,'Num 5',101);
insert into keystroke(id, jhi_label, js_code) values(46,'Num 6',102);
insert into keystroke(id, jhi_label, js_code) values(47,'Num 7',103);
insert into keystroke(id, jhi_label, js_code) values(48,'Num 8',104);
insert into keystroke(id, jhi_label, js_code) values(49,'Num 9',105);

insert into keystroke(id, jhi_label, js_code) values(50,'Up arrow',38);
insert into keystroke(id, jhi_label, js_code) values(51,'Down arrow',40);
insert into keystroke(id, jhi_label, js_code) values(52,'Left arrow',37);
insert into keystroke(id, jhi_label, js_code) values(53,'Right arrow',39);

insert into keystroke(id, jhi_label, js_code) values(54,'Tab',9);
insert into keystroke(id, jhi_label, js_code) values(55,'a',65);
insert into keystroke(id, jhi_label, js_code) values(56,'z',90);
insert into keystroke(id, jhi_label, js_code) values(57,'e',69);
insert into keystroke(id, jhi_label, js_code) values(58,'r',82);
insert into keystroke(id, jhi_label, js_code) values(59,'t',84);
insert into keystroke(id, jhi_label, js_code) values(60,'y',89);
insert into keystroke(id, jhi_label, js_code) values(61,'u',85);
insert into keystroke(id, jhi_label, js_code) values(62,'i',73);
insert into keystroke(id, jhi_label, js_code) values(63,'o',79);
insert into keystroke(id, jhi_label, js_code) values(64,'p',80);
insert into keystroke(id, jhi_label, js_code) values(65,'Caps lock',20);
insert into keystroke(id, jhi_label, js_code) values(66,'q',81);
insert into keystroke(id, jhi_label, js_code) values(67,'s',83);
insert into keystroke(id, jhi_label, js_code) values(68,'d',68);
insert into keystroke(id, jhi_label, js_code) values(69,'f',70);
insert into keystroke(id, jhi_label, js_code) values(70,'g',71);
insert into keystroke(id, jhi_label, js_code) values(71,'h',72);
insert into keystroke(id, jhi_label, js_code) values(72,'j',74);
insert into keystroke(id, jhi_label, js_code) values(73,'k',75);
insert into keystroke(id, jhi_label, js_code) values(74,'l',76);
insert into keystroke(id, jhi_label, js_code) values(75,'m',77);
insert into keystroke(id, jhi_label, js_code) values(76,'Shift',16);
insert into keystroke(id, jhi_label, js_code) values(77,'w',87);
insert into keystroke(id, jhi_label, js_code) values(78,'x',88);
insert into keystroke(id, jhi_label, js_code) values(79,'c',67);
insert into keystroke(id, jhi_label, js_code) values(80,'v',86);
insert into keystroke(id, jhi_label, js_code) values(81,'b',66);
insert into keystroke(id, jhi_label, js_code) values(82,'n',78);
insert into keystroke(id, jhi_label, js_code) values(83,',',188);
insert into keystroke(id, jhi_label, js_code) values(84,'Enter',13);
insert into keystroke(id, jhi_label, js_code) values(85,'Ctrl',17);
insert into keystroke(id, jhi_label, js_code) values(86,'Left Meta',91);
insert into keystroke(id, jhi_label, js_code) values(87,'Alt',18);
insert into keystroke(id, jhi_label, js_code) values(88,'Space',32);
insert into keystroke(id, jhi_label, js_code) values(89,'AltGr',225);
insert into keystroke(id, jhi_label, js_code) values(90,'Right Meta',93);

-- #####
-- Populate table opponent
-- #####
insert into opponent(id, name, difficulty) values(1,'Larry','CHILDISH');
insert into opponent(id, name, difficulty) values(2,'Easy Al','EASY');
insert into opponent(id, name, difficulty) values(3,'Average Joe','NORMAL');
insert into opponent(id, name, difficulty) values(4,'Hardy','HARD');
insert into opponent(id, name, difficulty) values(5,'The Rektator','NIGHTMARE');

-- #####
-- Populate table training_type
-- #####
insert into training_type(id, jhi_label, description) values(1, 'Programming Editors', 'Programming editors and IDEs');
insert into training_type(id, jhi_label, description) values(2, 'Terminal', 'Terminal commands and shortcut');
insert into training_type(id, jhi_label, description) values(3, 'Python programming', 'Python programming commands, structures ...');
insert into training_type(id, jhi_label, description) values(4, 'Javascript programming', 'Python programming commands, structures ...');
insert into training_type(id, jhi_label, description) values(5, 'Regex', 'Regular expressions');
insert into training_type(id, jhi_label, description) values(6, 'Apps', 'Regular and web apps like word, excel, github, slack ...');

-- #####
-- Populate table training
-- #####
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(1, 'Eclipse', null, 'WINLINUX', null, 1);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(2, 'Vim', null, 'WINLINUX', null, 1);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(3, 'Tmux', null, 'WINLINUX', null, 2);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(4, 'Python strings', null, 'WINLINUX', null, 3);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(5, 'Python regex', null, 'WINLINUX', null, 3);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(6, 'Javascript strings', null, 'WINLINUX', null, 4);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(7, 'Javascript regex', null, 'WINLINUX', null, 4);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(8, 'Regex', null, 'WINLINUX', null, 5);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(9, 'Word', null, 'WINLINUX', null, 6);
insert into training(id, jhi_label, description, operating_system, image_path, training_type_id) values(10, 'Excel', null, 'WINLINUX', null, 6);

-- #####
-- Populate table exercise
-- #####

-- Exercises for Eclipse IDE
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(1, 'Text editing I', null, 0, 1, 1);
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(2, 'Text editing II', null, 1, 2, 1);
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(3, 'Text selection', null, 2, 2, 1);
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(4, 'Java Source editing', null, 3, 2, 1);
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(5, 'Java Source navigation', null, 4, 3, 1);
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(6, 'Java refactoring', null, 5, 3,1);

-- Exercise for Vim shortcuts
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(7, 'Beginner text navigation', null, 0, 1, 2);


-- Exercises for Javascript strings
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(8, 'Basics I', null, 0, 1, 6);
insert into exercise(id, jhi_label, description, jhi_order, opponent_id, training_id) values(9, 'General I', null, 1, 1, 6);

-- #####
-- Populate table shortcut
-- #####

-- Shortcuts for Eclipse exercise 1
insert into shortcut(id, jhi_label) values (1,'Copy Lines'); -- alt+ctrl+DOWN
insert into shortcut(id, jhi_label) values (2, 'Insert line below current line'); -- shift+enter

-- Shortcuts for Eclipse exercise 2
insert into shortcut(id, jhi_label) values (3, 'Move lines down'); -- alt+DOWN
insert into shortcut(id, jhi_label) values (4, 'Move lines up'); -- alt+UP

-- Shortcuts for Vim exercise 1
insert into shortcut(id, jhi_label)  values (5, 'Move up one line'); -- k
insert into shortcut(id, jhi_label)  values (6, 'Move down one line'); -- j
insert into shortcut(id, jhi_label)  values (7, 'Move left one character'); -- h
insert into shortcut(id, jhi_label)  values (8, 'Move right one character'); -- l

-- #####
-- Populate table shortcut_keystrokes
-- #####

-- Shortcut_keystrokes for Eclipse exercise 1
-- alt+ctrl+DOWN
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(87,1);
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(85,1);
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(51,1);

-- shift+enter
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(76,2);
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(84,2);


-- Shortcut_keystrokes for Eclipse exercise 2
-- alt+DOWN
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(87,3);
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(51,3);

-- alt+UP
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(87,4);
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(50,4);


-- Shortcut_keystrokes for Vim exercise 1
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(73,5); -- k
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(72,6); -- j
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(71,7); -- h
insert into shortcut_keystrokes(keystrokes_id, shortcuts_id) values(74,8); -- l


-- #####
-- Populate table command
-- #####

-- Commands for Javascript string exercise 1
insert into command(id, command) values(1, 'str.length');
insert into command(id, command) values(2, 'str[n]');
insert into command(id, command) values(3, 'str.charAt(index)');
insert into command(id, command) values(4, 'str.toLowerCase()');
insert into command(id, command) values(5, 'str.toUpperCase()');

-- #####
-- Populate table question
-- #####

-- Questions for Eclipse exercise 1
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(1, 'Copy Lines', null, null, 1, 1);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(2, 'Insert line below current line', null, null, 2, 1);

-- Questions for Eclipse exercise 2
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(3, 'Move lines down', null, null, 3, 2);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(4, 'Move lines up', null, null, 4, 2);


-- Questions for Vim exercise 1
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(5, 'Move up one line', null, null, 5, 7);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(7, 'Move down one line', null, null, 6, 7);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(8, 'Move left one character', null, null, 7, 7);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(9, 'Move right one character', null, null, 8, 7);


-- Questions for Javascript strings exercise 1
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(10, 'Return length of string str', null, 1, null, 8);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(11, 'Return nth character of string str', null, 2, null, 8);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(12, 'Return character in string str at specified index', null, 3, null, 8);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(13, 'Convert string str to lower case', null, 4, null, 8);
insert into question(id, jhi_label, description, command_question_id, shorcut_question_id, exercise_id) values(14, 'Convert string str to upper case', null, 5, null, 8);


-- #####
-- Populate table jhi_user
-- #####

-- Already available user with id of 4

-- id:5, login: user2, pass: user (FOR TESTING PURPOSES ONLY)
INSERT INTO public.jhi_user (id, login, password_hash, first_name, last_name, email, image_url, activated, lang_key, activation_key, reset_key, created_by, created_date, reset_date, last_modified_by, last_modified_date) VALUES (5, 'user2', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User2', 'User2', 'user2@localhost', '', true, 'en', null, null, 'system', '2018-03-11 16:56:46.161646', null, 'system', null);

-- #####
-- Populate table training_followed
-- #####

-- Trainings followed by user
insert into training_followed(id, last_visit_date, training_id, user_id) values(1, now(), 1, 4); -- Eclipse training

-- Trainings followed by user2
insert into training_followed(id, last_visit_date, training_id, user_id) values(2, now(), 2, 5); -- Vim training
insert into training_followed(id, last_visit_date, training_id, user_id) values(3, now(), 6, 5); -- Javascript strings

-- #####
-- Populate table exercise_visited
-- #####

-- Exercises visited by user
insert into exercise_visited(id, last_phase_finished, exercise_id, user_id) values (1, 'TEST', 1, 4); -- Eclipse exercise 1
insert into exercise_visited(id, last_phase_finished, exercise_id, user_id) values (2, null, 2, 4); -- Eclipse exercise 2

-- Exercises visited by user2
insert into exercise_visited(id, last_phase_finished, exercise_id, user_id) values (3, 'FIGHT', 7, 5); -- Vim exercise 1
insert into exercise_visited(id, last_phase_finished, exercise_id, user_id) values (4, 'PRACTISE', 8, 5); -- Javascript exercise 1
