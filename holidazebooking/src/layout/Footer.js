
import React from 'react';
import { Container } from 'react-bootstrap';

function AppFooter() {
	return (
		<footer className="App-footer">
			<Container>
				<p>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
			</Container>
		</footer>
	);
}

export default AppFooter;
