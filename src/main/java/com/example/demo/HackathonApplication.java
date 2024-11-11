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
			question question1 = new question(1, "What is the capital of France?", new String[]{"Berlin", "Madrid", "Paris", "Rome"}, 2, "Common knowledge", "img/flag.jpg");
			question question2 = new question(2, "Which planet is known as the Red Planet?", new String[]{"Earth", "Mars", "Jupiter", "Saturn"}, 1, "Common knowledge", "");
			question question3 = new question(3, "What is the largest ocean on Earth?", new String[]{"Atlantic", "Indian", "Arctic", "Pacific"}, 3, "Common knowledge", "");
			question question4 = new question(4, "What is the chemical symbol for water?", new String[]{"O", "H2O", "CO2", "H2"}, 1, "Common knowledge", "");
			question question5 = new question(5, "Who wrote 'Romeo and Juliet'?", new String[]{"Shakespeare", "Hemingway", "Twain", "Orwell"}, 0, "Common knowledge","");
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
