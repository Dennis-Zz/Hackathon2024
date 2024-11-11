package com.example.demo;

import com.example.demo.questions.QuestionBankService;
import com.example.demo.questions.question;
import org.slf4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
@SpringBootApplication
public class HackathonApplication {
	private static final Logger log  = LoggerFactory.getLogger(Appendable.class);

	public static void main(String[] args) {
		SpringApplication.run(HackathonApplication.class, args);


	}

	@Bean
	CommandLineRunner runner(QuestionBankService questionBankService) {
		return args -> {
			log.info("Application started, adding questions to the question bank.");

			// 15 questions
			question question1 = new question(1, "Which of the following lines of code will print \"Hello, World!\" in Python?",
					new String[]{"console.log(\"Hello, World!\")",
							"echo \"Hello, World!\"",
							"print(\"Hello, World!\")",
							"printf(\"Hello, World!\")"},
					2,
					"print() is the correct function in Python for outputting text to the console. Other options (e.g., console.log and printf) are used in languages like JavaScript and C, not Python.",
					"");

			question question2 = new question(2, "What data type is the following value in Python: 3.14?",
					new String[]{"int",
							"float",
							"double",
							"string"},
					1,
					"3.14 is a decimal number, so it’s a float type in Python. Other data types include int (integer), string(text), and double, which is similar to float in some other languages but not a distinct type in Python.\n",
					"");

			question question3 = new question(3, "Which of the following is a valid variable name in Python?",
					new String[]{"1st_variable",
							"my-variable",
							"my_variable",
							"class"}, 3,
					"In Python, variable names must begin with a letter or underscore and cannot contain spaces or dashes. class is a reserved keyword in Python, so it cannot be used as a variable name.",
					"");
			question question4 = new question(4, "What will be the output of the following code?",
					new String[]{"Greater than 5", "5 or less", " 10", "no output"},
					0,
					"The if statement checks if x is greater than 5. Since x = 10, the condition is true, so it prints \"Greater than 5\". This question teaches basic conditional logic.", "img/4.png");
			question question5 = new question(5, "How many times will the following loop run?",
					new String[]{"4", "5", "6", "Infinite"}, 1,
					"range(5) generates numbers from 0 up to (but not including) 5. Therefore, the loop iterates 5 times, printing numbers 0 through 4. This question highlights how range works in Python.", "img/5.png");
			question question6 = new question(6, "What is the correct way to define a function in Python?",
					new String[]{"function myFunction() {}",
							"def myFunction:",
							"def myFunction():",
							"myFunction func() {}"}, 2,
					"In Python, def is used to define a function, followed by the function name and parentheses. Other options are syntax for functions in other languages or incorrect function syntax.", "");
			question question7 = new question(7, "What will be the output of this code?",
					new String[]{"A", "Alice", "a", "Error"}, 0,
					"Strings in Python are indexed starting from 0. name[0] accesses the first character in the string \"Alice\", which is A. This question introduces basic string indexing.", "img/7.png");
			question question8 = new question(8, "What will be the result of this expression: 10 // 3 in Python?",
					new String[]{"3.33", "3", "4", "10.0"},2,
					"The // operator is floor division in Python, which returns the integer part of the division. So 10 // 3 gives 3, discarding the remainder. This question clarifies the difference between integer and regular division.", "");
			question question9 = new question(9, "What will be the output of this code?",
					new String[]{"True", "False", "5", "Error"},0,
					"In Python, and is used to combine boolean conditions. Both 5 > 3 and 2 < 4 are true, so the result of andis True. This question reinforces basic boolean logic.", "img/9.png");

			question question10 = new question(10, "What will len(\"Python\") return in Python?",
					new String[]{"5", "6", "7", "An error"},1,
					"The len() function in Python calculates the length (number of characters) of a string, list, or other data structure. In this case, the string \"Python\" has exactly 6 characters: P, y, t, h, o, and n. Therefore, len(\"Python\") returns 6.", "");
			question question11 = new question(11, "Which of the following code snippets correctly appends an item to a list in Python?",
					new String[]{"my_list += \"item\"", "my_list.append(\"item\")", "my_list.add(\"item\")", "my_list.push(\"item\")"},1,
					"append() is the correct method to add an item to the end of a list in Python. Other options either don't exist or are used in other languages. This question teaches list manipulation.", "");

			question question12 = new question(12, "How do you write a comment in Python?",
					new String[]{"// This is a comment", "# This is a comment", "/* This is a comment */", "<!-- This is a comment -->"},
					1,
					"In Python, comments are written with a # symbol, which tells the interpreter to ignore the line. Other options represent comment syntax in different languages (e.g., // in C++ or Java).",
					"");
			question question13 = new question(13, "What is the output of the following code?",
					new String[]{"2 3 4 5", "2 3 4", "0 1 2 3 4", "2 4"}, 1, "range(2, 5) generates numbers starting from 2 up to (but not including) 5, so it prints 2 3 4. This question demonstrates how the range function works with a start and end.",
					"img/13.png");
			question question14 = new question(14, "Which line of code correctly takes input from a user in Python?",
					new String[]{"input(\"Enter your name: \")", "get_input(\"Enter your name: \")", "console.input(\"Enter your name: \")", "scan(\"Enter your name: \")"}, 0,
					"input() is used in Python to get input from the user as a string. Other options either don't exist in Python or are syntax for input in other languages. This question introduces basic user input.",
					"");
			question question15 = new question(15, "Which of the following is the correct way to concatenate two strings in Python?",
					new String[]{"\"Hello\" + \"World\"", "\"Hello\".append(\"World\")", "\"Hello\" . \"World\"", "\"Hello\".concat(\"World\")"}, 0, "In Python, strings are concatenated using the + operator. The other options use incorrect or non-existent methods for combining strings. This question reinforces string manipulation.", "");


			// Add questions to the service
			questionBankService.addQuestion(question1);
			questionBankService.addQuestion(question2);
			questionBankService.addQuestion(question3);
			questionBankService.addQuestion(question4);
			questionBankService.addQuestion(question5);
			questionBankService.addQuestion(question6);
			questionBankService.addQuestion(question7);
			questionBankService.addQuestion(question8);
			questionBankService.addQuestion(question9);
			questionBankService.addQuestion(question10);
			questionBankService.addQuestion(question11);
			questionBankService.addQuestion(question12);
			questionBankService.addQuestion(question13);
			questionBankService.addQuestion(question14);
			questionBankService.addQuestion(question15);

			log.info("7 questions added to the question bank.");
		};
	}

}
