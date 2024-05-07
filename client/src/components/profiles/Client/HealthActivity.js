import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Star from "@mui/icons-material/Star";
import { styled } from "@mui/system";

const Header = styled("div")({
  textAlign: "center",
  margin: "2rem 0",
  backgroundColor: "#0d47a1", // Navy blue background
  padding: "1rem",
  color: "white",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a subtle shadow
});

const ArticleCard = styled(Card)({
  margin: "2rem",
  textAlign: "center",
  cursor: "pointer",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Adding a shadow on hover
  },
  backgroundColor: "white", // White background for cards
  borderRadius: "10px", // Rounded corners
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Adding a subtle shadow
});

const Image = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: "10px 10px 0 0", // Rounded corners only at the top
});

const MostViewed = styled("div")({
  textAlign: "center",
  margin: "4rem 0",
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const StarIcon = styled(Star)`
  color: #ffd700; // Golden color for stars
  vertical-align: middle;
`;

const MostViewedHeader = styled("h3")({
  display: "inline-block",
  marginRight: "0.5rem",
});


const Footer = styled("footer")({
  backgroundColor: "#0d47a1", // Navy blue background
  padding: "40px 0", // Increased padding for better spacing
  color: "#ffffff", // White text color
});

const FooterHeading = styled("h2")({
  fontSize: "32px", // Larger font size
  fontWeight: "bold", // Bold font weight
  marginBottom: "30px", // Increased bottom margin
  textAlign: "center", // Center align the text
});

const FooterLink = styled("a")({
  color: "#f0f0f0", // Mint green color for links
  textDecoration: "none", // Remove underline
  marginRight: "30px", // Add right margin for spacing
  transition: "color 0.3s", // Smooth color transition on hover
  fontSize: "24px", // Larger font size for links
  "&:hover": {
    color: "#43a047", // Darker mint green color on hover
  },
});

const FooterTableContainer = styled(TableContainer)({
  marginTop: "30px", // Add top margin for spacing
});

const FooterTableCell = styled(TableCell)({
  padding: "15px 20px", // Increased padding for better spacing
});



function HealthArticle() {
  const handleImageClick = (link) => {
    window.open(link, "_self");
  };

  const articles = [
    {
      title: "Importance of Sleep",
      imageUrl: "./sleepimg.jpg",
      link: "https://www.healthhub.sg/live-healthy/sleep",
    },
    {
      title: "How to Quit Smoking Gradually",
      imageUrl: "./smoking.jpg",
      link: "https://www.healthhub.sg/live-healthy/gradual-reduction-in-a-nutshell",
    },
    {
      title: "Healthy Mind: Tips For A Healthy Brain!",
      imageUrl: "./depressionn.jpg",
      link: "https://www.healthhub.sg/live-healthy/healthy-brain",
    },
    {
      title: "How To Identify And Deal With Depression",
      imageUrl: "./depression.jpg",
      link: "https://www.healthhub.sg/live-healthy/how-to-identify-and-deal-with-depression",
    },
    {
      title: "Diet vs Exercise",
      imageUrl: "./diet.jpg",
      link: "https://www.healthhub.sg/live-healthy/2015-oct-nhg-die",
    },
    {
      title: "Benefits of Fruits: Fun Fruity Facts for Health",
      imageUrl: "./fruits.jpg",
      link: "https://www.healthhub.sg/live-healthy/fun-fruity-facts",
    },
  ];

  const mostViewedArticles = [
    {
      category: "Alerts and Advisories",
      title: "Guidelines for Traditional Medicinal Materials",
      imageUrl: "./traditional_medicines.jpg",
      link: "https://www.healthhub.sg/live-healthy/guidelines-for-traditional-medicinal-materials",
    },
    {
      category: "Body Care",
      title: "The Importance of Sleep",
      imageUrl: "./sleepimg.jpg",
      link: "https://www.healthhub.sg/live-healthy/sleep",
    },
    {
      category: "Child and Teen Health",
      title: "Helping Youth Fight Depression",
      imageUrl: "./depressionn.jpg",
      link: "https://www.healthhub.sg/live-healthy/helping-youth-fight-depression",
    },
    {
      category: "Alerts and Advisories",
      title: "Health Advisory: Zika Virus Infection",
      imageUrl: "./zikavirus.jpg",
      link: "https://www.healthhub.sg/live-healthy/health-advisory-zika-virus-infection",
    },
    {
      category: "Body Care",
      title: "Did You Know BMI Isn’t The Same For Adults And Kids?",
      imageUrl: "./bmi.jpg",
      link: "https://www.healthhub.sg/live-healthy/differencesbetweenchildandadultbmi",
    },
    {
      category: "Body Care",
      title: "Feeding Your Baby Solid Food: Baby's First Food Journey",
      imageUrl: "./FEEDING.jpg",
      link: "https://www.healthhub.sg/live-healthy/babys_first_food_journey",
    },
    {
      category: "Alerts and Advisories",
      title: "How to Protect Yourself Against the Haze",
      imageUrl: "./haze.PNG",
      link: "https://www.healthhub.sg/live-healthy/how-to-protect-yourself-against-haze",
    },
    {
      category: "Child and Teen Health",
      title: "Building Resilience In Your Child",
      imageUrl: "./resilence.jpg",
      link: "https://www.healthhub.sg/live-healthy/building-resilience-in-your-child",
    },
    {
      category: "Child and Teen Health",
      title: "3 Ways Your Child Benefits From Boredom",
      imageUrl: "./boredom.jpg",
      link: "https://www.healthhub.sg/live-healthy/daydreaming-kids-wondering-or-wandering-minds",
    },
  ];

  return (
    <div>
      <Header>
        <Typography variant="h3" component="h1" gutterBottom>
          <b>Live Healthy</b>
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Articles On Healthy Living
        </Typography>
      </Header>

      <Grid container justifyContent="center" spacing={2}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ArticleCard onClick={() => handleImageClick(article.link)}>
              <CardContent>
                <Image src={article.imageUrl} alt={article.title} />
                <Typography variant="h6">{article.title}</Typography>
              </CardContent>
            </ArticleCard>
          </Grid>
        ))}
      </Grid>

      <MostViewed>
      <Typography variant="h3" component="h2" gutterBottom>
  <MostViewedHeader>★</MostViewedHeader>Most Viewed<MostViewedHeader>★</MostViewedHeader>
</Typography>

        <Grid container spacing={3} justifyContent="center">
          {/* Alerts and Advisories */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" gutterBottom>Alerts and Advisories</Typography>
            {mostViewedArticles
              .filter((article) => article.category === "Alerts and Advisories")
              .slice(0, 3)
              .map((article, index) => (
                <div key={index}>
                  <ArticleCard>
                    <CardContent>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={article.imageUrl}
                          alt={article.category}
                        />
                      </a>
                      <div>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </div>
                    </CardContent>
                  </ArticleCard>
                </div>
              ))}
          </Grid>
          {/* Body Care */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" gutterBottom>Body Care</Typography>
            {mostViewedArticles
              .filter((article) => article.category === "Body Care")
              .slice(0, 3)
              .map((article, index) => (
                <div key={index}>
                  <ArticleCard>
                    <CardContent>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={article.imageUrl}
                          alt={article.category}
                        />
                      </a>
                      <div>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </div>
                    </CardContent>
                  </ArticleCard>
                </div>
              ))}
          </Grid>
          {/* Child and Teen Health */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" gutterBottom>Child and Teen Health</Typography>
            {mostViewedArticles
              .filter((article) => article.category === "Child and Teen Health")
              .slice(0, 3)
              .map((article, index) => (
                <div key={index}>
                  <ArticleCard>
                    <CardContent>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={article.imageUrl}
                          alt={article.category}
                        />
                      </a>
                      <div>
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {article.title}
                        </a>
                      </div>
                    </CardContent>
                  </ArticleCard>
                </div>
              ))}
          </Grid>
        </Grid>
      </MostViewed>

      
    <Footer>
      <FooterHeading>Browse Live Healthy</FooterHeading>
      <FooterTableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Alerts-Advisories">
                  Alerts and Advisories
                </FooterLink>
              </FooterTableCell>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Exercise-Fitness">
                  Exercise And Fitness
                </FooterLink>
              </FooterTableCell>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Mind-Balance">
                  Mind And Balance
                </FooterLink>
              </FooterTableCell>
            </TableRow>
            <TableRow>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=body-care">
                  Body Care
                </FooterLink>
              </FooterTableCell>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=FIGHT-Travel-Health">
                  Fight And Travel Health
                </FooterLink>
              </FooterTableCell>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Pregnancy-Infant-Health">
                  Pregnancy And Infant Health
                </FooterLink>
              </FooterTableCell>
            </TableRow>
            <TableRow>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Child-Teen-Health">
                  Child And Teen Health
                </FooterLink>
              </FooterTableCell>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Food-Nutrition">
                  Food And Nutrition
                </FooterLink>
              </FooterTableCell>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Senior-Health-Caregiving">
                  Senior Health And Caregiving
                </FooterLink>
              </FooterTableCell>
            </TableRow>
            <TableRow>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Chronic-Illnesses">
                  Conditions And Illnesses
                </FooterLink>
              </FooterTableCell>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Intoxicates-Addictions">
                  Intoxicates And Addictions
                </FooterLink>
              </FooterTableCell>
              <FooterTableCell>
                <FooterLink href="https://www.healthhub.sg/live-healthy?category=Sexual-Health-Relationships">
                  Sexual Health And Relationships
                </FooterLink>
              </FooterTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </FooterTableContainer>
    </Footer>
    </div>
  );
}

export default HealthArticle;
