# Prompt for Developing HowToPwn Team Website

## Project Overview
Create a professional cybersecurity team website for **HowToPwn**, a newly established team formed in **March 2025** with a **modest scale**, inspired by the design and functionality of https://owlsec.ai/. The website should highlight the team's early achievements, services, and member profiles, using a **black-and-white theme** and **Inter Mono font** for a modern, hacker-inspired aesthetic. The team’s achievements include:
- **Top #54 HackTheBox Apocalypse CTF 2025**
- **Top #80 HTB Global**
- **Top #80 TryHackMe Hackfinity 2025**

## Design Requirements
1. **Theme**: Black-and-white color scheme (use shades of black, white, and grayscale only) to reflect the team’s minimalist and hacker-centric identity.
2. **Typography**: Use **Inter Mono** font for all text (headings, body, navigation, etc.) to maintain a terminal-like aesthetic.
3. **Layout**: Replicate the structure and aesthetic of https://owlsec.ai/, scaled down to suit a small, newly formed team, including:
   - A hero section with a concise tagline and team achievements.
   - A services section outlining core cybersecurity offerings (e.g., penetration testing, CTF participation, basic security consulting).
   - A blog/news section for team updates and CTF write-ups, with minimal initial content.
   - A contact form with a sleek, minimalist design.
   - A simple navigation bar with smooth scrolling and hover effects.
4. **Responsiveness**: Ensure the website is fully responsive across desktop, tablet, and mobile devices.
5. **Animations**: Use subtle animations (e.g., fade-ins, hover effects) similar to owlsec.ai, but keep them minimal to reflect the team’s modest scale.

## Specific Page Requirements
### About Us Page
- **Layout**: Design a grid layout with **7 member profile cards** (one for each team member) to showcase the small but dedicated team.
- **Profile Card Design**: Each card should follow the style and layout of the portfolio section on https://uziii2208.github.io/pages/about.html, including:
  - A circular profile picture placeholder (grayscale filter to match the theme).
  - Member name in **Inter Mono** (bold, larger size).
  - A short bio (1-2 sentences) describing their expertise (e.g., web exploitation, network security) and noting their newness to the team.
  - Social links (e.g., GitHub, HackTheBox, TryHackMe) with icons styled in black-and-white.
  - A "Portfolio" section with 1-2 clickable project tiles (placeholders for CTF write-ups or personal projects, reflecting the team’s early stage).
- **Grid Arrangement**: Arrange the 7 cards in a responsive grid (e.g., 3 columns on desktop, 2 on tablet, 1 on mobile).
- **Background**: Use a clean white background with black borders or subtle grayscale shadows for cards to keep the design simple.

### Other Pages
- **Home Page**: Mimic owlsec.ai’s hero section with a tagline like “HowToPwn: Rising Cybersecurity Talent” and prominently list the team’s 2025 achievements. Mention the team’s formation in March 2025 to set context.
- **Services Page**: Include sections for penetration testing, CTF training, and entry-level security consulting, styled with minimalist icons and Inter Mono text. Keep descriptions concise to reflect the team’s modest scope.
- **Blog Page**: Create a blog layout for CTF write-ups and team milestones (e.g., formation, first CTF), with a card-based design for each post. Start with 1-2 placeholder posts due to the team’s recent formation.
- **Contact Page**: Include a contact form with fields for name, email, and message, styled in black-and-white with Inter Mono placeholders.

## Technical Requirements
1. **Tech Stack**:
   - **Frontend**: HTML, CSS, JavaScript (use React with JSX and Tailwind CSS for styling, hosted via CDN like cdn.jsdelivr.net).
   - **Font**: Import **Inter Mono** from Google Fonts or a CDN.
   - **Icons**: Use a black-and-white icon set (e.g., FontAwesome or Feather Icons).
2. **Single-Page Application**: Build a single HTML file with React components for each section/page, ensuring it runs in any browser.
3. **No Form Submission**: Avoid using `<form>` onSubmit due to sandbox restrictions; use JavaScript to handle form data (e.g., log to console for now).
4. **ClassName**: Use `className` for JSX styling instead of `class`.
5. **Performance**: Optimize for fast loading with minimal external dependencies, suitable for a small-scale project.

## Deliverables
1. A single `index.html` file containing the entire website (HTML, JSX, Tailwind CSS, and JavaScript).
2. All assets (e.g., placeholder images, icons) hosted via CDN or embedded as base64 (if necessary).
3. A responsive, pixel-perfect replica of owlsec.ai’s aesthetic, customized for HowToPwn with the specified theme, font, and modest scale.

## Example Member Profile (for About Us)
```markdown
### Member Name: 0xNewbie
**Bio**: New to cybersecurity, specializing in web exploitation. Joined HowToPwn in March 2025.
**Social Links**:
- GitHub: github.com/0xNewbie
- HackTheBox: hackthebox.com/0xNewbie
**Portfolio**:
- CTF Write-Up: Apocalypse CTF 2025 Beginner Challenge
```

## Notes
- Emphasize the team’s **recent formation (March 2025)** and **modest scale** through concise content and a lean design.
- Maintain a “hacker-esque” feel with a terminal-like aesthetic (monospaced font, clean lines, minimal color).
- Use placeholder content for member bios and portfolio items, tailored to a new team with limited but promising achievements.
- Test the website in multiple browsers to ensure compatibility.