from playwright.sync_api import sync_playwright, expect
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Wait for dev server to be ready
        max_retries = 30
        for i in range(max_retries):
            try:
                page.goto("http://localhost:4321")
                break
            except Exception:
                if i == max_retries - 1:
                    raise
                time.sleep(1)

        # Wait for the page to hydrate and scripts to run
        page.wait_for_load_state("networkidle")

        # Check initial state - first reveal element (hero) might be visible or not depending on viewport
        # We scroll down to trigger intersection observer

        page.evaluate("window.scrollTo(0, 1000)")
        time.sleep(0.5) # Wait for animation/class addition

        # Take screenshot of scrolled state
        page.screenshot(path="verification/scrolled.png")

        # Verify classes are added
        # We look for elements with class 'reveal active'
        active_reveals = page.locator(".reveal.active").count()
        print(f"Found {active_reveals} active reveal elements")

        browser.close()

if __name__ == "__main__":
    run()
