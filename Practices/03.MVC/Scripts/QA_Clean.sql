DELETE FROM `schooldb`.`SubjectsAndStudents` WHERE SubjectId >= 0;
DELETE FROM `schooldb`.`Subjects` WHERE Id >= 0;
ALTER TABLE `schooldb`.`Subjects` AUTO_INCREMENT = 1;
DELETE FROM `schooldb`.`Students` WHERE Id >= 0;
ALTER TABLE `schooldb`.`Students` AUTO_INCREMENT = 1;
