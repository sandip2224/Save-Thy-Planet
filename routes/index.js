const express = require('express')
const router = express.Router()

const t1 = {
    wildlife: "UNDERSTANDING CONSUMER BEHAVIOUR TO REDUCE WILDLIFE DEMAND",
    recovery: "ROAD TO RECOVERY IN LATIN AMERICA",
    truth: "THE TRUTH ABOUT WHITE TIGERS"
}

const d1 = {
    wildlife: "Overexploitation and consumption of wildlife - through trade or as food - are major drivers of biodiversity loss. At the same time, human interactions with wildlife can increase the risk of emerging zoonotic diseases—those that originate in animals. Curbing illegal, unsustainable and high-disease-risk wildlife consumer demand is an urgent and difficult task. Regulatory actions, such as bans on wildlife trade, that shut down and restrict access to high-risk wildlife markets have been popular, but history has shown that making certain goods illegal can sometimes drive existing demand underground to black markets. Today, conservationists are increasingly adopting an approach that complements regulatory measures, using consumer data and behavioral science findings to inform new types of campaigns.If we want to successfully change attitudes and end wildlife demand, we need solid research that shows why people purchase wildlife products. Demand reduction campaigns that focus on diminishing the purchase of specific wildlife products work best when they target consumers and develop messaging based on research of consumer motivations.This allows campaigns to target consumers more effectively and develop appropriate messaging.Recent campaigns have advanced significantly in identifying reasons for wildlife purchasing, particularly those that use consumer surveys to help target specific groups of interest.",
    recovery: "Ricardo Schwartz was excited as he awaited the big delivery. A 10-month-old Maremma sheepdog had just made the two-day, nearly 2,000-mile journey from Patagonia to Misiones Province in the northeastern tip of Argentina, transported in a blue kennel atop a truck bed by two technicians from the Instituto Nacional de Tecnología Agropecuaria (INTA). Once it arrived, the specially trained dog would have an important job to do: help a local farmer protect his sheep from a jaguar.  Together, Schwartz and the farmer had tried other methods to scare away the predator—electric fences, automatic floodlights, loud noises—but nothing had worked.Schwartz feared that if they couldn’t find a solution, the farmer would eventually kill the jaguar.But INTA had a solution.For years, the institute has been breeding sheepdogs and training them to guard livestock against predators to help minimize conflicts between herders and pumas in Patagonia, explains Schwartz.As puppies, the dogs are raised alongside a flock of sheep and spend 24 hours a day with them, which fosters a strong bond between the animals.In time, “the dog is adopted by the sheep ...and defends them as if they were family,” constantly patrolling and marking its territory. “It’s basically a sheep that barks,” he says. Schwartz understands well the challenges farmers in Misiones face.He moved to the region with his family when he was 14 years old and has been working the same land—growing yerba mate and raising chickens, pigs, and cattle—for most of his life.Some two decades ago, he too began losing his livestock to a jaguar.Then conservationists from the Fundación Vida Silvestre Argentina(or Vida Silvestre), a WWF partner organization since 1988, approached Schwartz at a cattle fair and offered to install an electric fence around his pasture. The fence was a game changer.In addition to successfully safeguarding his livestock, it transformed Schwartz into an unlikely evangelist for jaguar conservation; he’s been helping fellow farmers find nonlethal alternatives to human- jaguar conflict ever since.And sheepdogs, he believes, are a promising tool.If they work in Misiones as well as they have in Patagonia, he says, they could allow farmers and jaguars to share the land more peacefully.",
    truth: "White tigers are not a separate subspecies of tiger. There is only one tiger species and only two recognized subspecies in the world—the Continental (Panthera tigris tigris) and the Sunda (Panthera tigris sondaica). The color of the white tiger's fur is the result of a genetic mutation called leucism. In fact, this white coat would be a hindrance in the wild, as it doesn’t provide a tiger with any camouflage, which greatly reduces their chance of survival. The white tiger is a result of a rare genetic mutation and the most efficient way to breed them is by using two tigers who have the recessive genes needed to produce offspring with a white coat. In captive breeding facilities these two individuals are often related, making inbreeding common. In the US, all white tigers originate from a single male white continental tiger which was imported to the country decades ago."
}

router.get('/', (req, res) => {
    res.render("home")
})

router.get('/home', (req, res) => {
    res.redirect("/")
})

router.get('/animal/:animalName', (req, res) => {
    console.log(req.params.animalName);
})

router.get('/stories', (req, res) => {
    res.render('stories')
})

router.get('/stories/:storyVal', (req, res) => {
    const storyName = req.params.storyVal
    res.render("story", {
        title: t1[storyName],
        desc: d1[storyName]
    })
})

module.exports = router
