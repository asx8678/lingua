from playwright.sync_api import sync_playwright

def verify_test_focus():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the test page
        page.goto("http://localhost:4321/test")

        # Click "Start Test"
        # Since it's hidden initially behind other things or needs loading, we wait.
        # But wait, the test loads question bank.
        # We need to make sure we can click start.

        # Wait for start button to be enabled (aria-busy removed)
        start_btn = page.locator("#llStartBtn")
        start_btn.wait_for(state="visible")

        # Click start
        start_btn.click()

        # Wait for quiz step to appear
        quiz_step = page.locator('[data-step="quiz"]')
        quiz_step.wait_for(state="visible")

        # Verify focus moved to question text
        # We use evaluate to check document.activeElement
        focused_id = page.evaluate("document.activeElement.id")
        print(f"Focused element ID after start: {focused_id}")

        # Take screenshot of quiz
        page.screenshot(path="verification/quiz_start.png")

        if focused_id != "llQuestionText":
            print("ERROR: Focus did not move to llQuestionText")
            # We don't exit, just log.

        # Select an option (radio)
        options = page.locator(".ll-option")
        options.first.click()

        # Click Next
        next_btn = page.locator("#llNextBtn")
        next_btn.click()

        # Verify focus moved to question text again (for next question)
        # Note: animation might delay it? logic is synchronous in renderQuestion though.
        # Check active element again
        focused_id_2 = page.evaluate("document.activeElement.id")
        print(f"Focused element ID after next: {focused_id_2}")

        if focused_id_2 != "llQuestionText":
             print("ERROR: Focus did not move to llQuestionText on next question")

        browser.close()

if __name__ == "__main__":
    verify_test_focus()
