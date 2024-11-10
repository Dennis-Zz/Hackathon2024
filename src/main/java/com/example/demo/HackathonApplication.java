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

			// Define 7 sample questions
			question question1 = new question(1, "Which of the following lines of code will print \"Hello, World!\" in Python?\n", new String[]{"console.log(\"Hello, World!\")", "echo \"Hello, World!\"", "print(\"Hello, World!\")\n", "printf(\"Hello, World!\")"}, 2, "Common knowledge", "img/flag.jpg");
			question question2 = new question(2, "What data type is the following value in Python: 3.14?", new String[]{"int", "float", "double", "string"}, 1, "Common knowledge", "");
			question question3 = new question(3, "Which of the following is a valid variable name in Python?", new String[]{"1st_variable", "my-variable", "my_variable", "class"}, 2, "Common knowledge", "");
			question question4 = new question(4, "What will be the output of the following code?\n" +
					"python\n" +
					"Copy code\n" +
					"x = 10\n" +
					"if x > 5:\n" +
					"    print(\"Greater than 5\")\n" +
					"else:\n" +
					"    print(\"5 or less\")\n", new String[]{"Greater than 5", "5 or less", "10", "No output"}, 0, "Common knowledge", "");
			question question5 = new question(5, "How many times will the following loop run?\n" +
					"python\n" +
					"Copy code\n" +
					"for i in range(5):\n" +
					"    print(i)\n", new String[]{"4", "5", "6", "Infinite"}, 1, "Common knowledge","");
			question question6 = new question(6, "What is the boiling point of water?", new String[]{"100°C", "0°C", "50°C", "200°C"}, 0, "Common knowledge", "");
			question question7 = new question(7, "What is the largest planet in our Solar System?", new String[]{"Earth", "Venus", "Mars", "Jupiter"}, 3, "Common knowledge", "");

			// Add questions to the service
			questionBankService.addQuestion(question1);
			questionBankService.addQuestion(question2);
			questionBankService.addQuestion(question3);
			questionBankService.addQuestion(question4);
			questionBankService.addQuestion(question5);
			questionBankService.addQuestion(question6);
			questionBankService.addQuestion(question7);

			log.info("7 questions added to the question bank.");
		};
	}

}
