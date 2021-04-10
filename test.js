async function run() { 
  const page = await Dova.visit("https://next.material-ui-pickers.dev/regression")

  // console.log(await page.contains(By.id("basic-datepicker")))
  await page.click(By.id("basic-datepicker"))

  await page.click(By.ariaLabel("next month"));
  await page.click(By.ariaLabel("next month"));

  await page.click(By.ariaLabel("Mar 19, 2019"))
}

run().catch(console.error)