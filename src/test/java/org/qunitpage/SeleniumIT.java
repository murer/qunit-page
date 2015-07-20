package org.qunitpage;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SeleniumIT {

	@Test
	public void testSelenium() {

		WebDriver driver = new FirefoxDriver();
		driver.get("http://qunitpage.org/sample/company-sample/index.html");
		WebDriverWait wait = new WebDriverWait(driver, 10);

		wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href='#create']"))).click();
		WebElement save = wait.until(ExpectedConditions.elementToBeClickable(By.id("save")));

		// driver.findElement(By.id("name")).sendKeys("Andrei Tognolo");
		// driver.findElement(By.id("number")).sendKeys("123");
		wait.until(ExpectedConditions.presenceOfElementLocated(By.id("name"))).sendKeys("Andrei Tognolo");
		wait.until(ExpectedConditions.presenceOfElementLocated(By.id("number"))).sendKeys("123");

		save.click();

		wait.until(ExpectedConditions.textToBePresentInElementLocated(By.cssSelector("h1"), "Search"));
		wait.until(ExpectedConditions.presenceOfElementLocated(By.id("name"))).sendKeys("Andrei Tognolo");
		wait.until(ExpectedConditions.elementToBeClickable(By.id("search"))).click();

		wait.until(ExpectedConditions.textToBePresentInElementLocated(By.cssSelector("tr td"), "Andrei Tognolo"));

		driver.quit();

	}

}
