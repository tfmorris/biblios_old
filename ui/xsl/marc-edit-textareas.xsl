<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:marc="http://www.loc.gov/MARC21/slim" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" indent="yes"/>
	<xsl:variable name='marc21defs' select="document('marc21.xml')"/>

	<xsl:template match="/">
			<xsl:apply-templates/>
	</xsl:template>
	
	<xsl:template match="marc:record">
    <form action='' id='fixedfields_editor' name='fixedfields_editor'>
	<xsl:variable name='leader' select="marc:leader"/>
	<xsl:variable name='tag008' select="marc:controlfield[@tag='008']"/>
	<xsl:variable name="rectype" select="substring($leader, $marc21defs//value[@name='Type']/@position+1, $marc21defs//value[@name='Type']/@length)"/>
		<table id="fixed_field_grid" class="fixed_field">
			<tr>
				<th NOWRAP="TRUE" ALIGN="RIGHT" VALIGN="TOP">
				</th>
				<td></td>
				<td></td>

				<td id="leader" colspan="1">
					<table id="fixed_field_all_mat" cellspacing="5" halign="right">
					<tr>
                      <td style='display:none;'>
							<xsl:call-template name="fixed-field-text">
								<xsl:with-param name="name" select="'RLen'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>

						</td>

						<td style='display:none;'>
							<xsl:call-template name="fixed-field-text">
								<xsl:with-param name="name" select="'Base'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>

						</td>

						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'RStat'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>

						</td>

						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'Type'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'BLvl'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'Desc'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'ELvl'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'Enc'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'Ctrl'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>
						</td>
					</tr>
					<tr>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'DtSt'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-text">
								<xsl:with-param name="name" select="'Date1'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-text">
								<xsl:with-param name="name" select="'Date2'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>

						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'Ctry'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'Lang'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'Srce'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'MRec'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>
						<td>
							<xsl:call-template name="fixed-field-select">
								<xsl:with-param name="name" select="'Link'" />
								<xsl:with-param name="tag" select="$leader" />
							</xsl:call-template>
						</td>
						<td style='display:none;'>
							<xsl:call-template name="fixed-field-text">
								<xsl:with-param name="name" select="'DateEntered'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>
		    
						<td>
							<xsl:call-template name="fixed-field-text">
								<xsl:with-param name="name" select="'Form'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
						</td>


					</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<xsl:if test="$rectype = 'a'">
					<table id="fixed_field_books" halign="right">
						<tr>
							<td>
							<xsl:call-template name="fixed-field-text">
								<xsl:with-param name="name" select="'Ills'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>

							<td>
							<xsl:call-template name="fixed-field-select">	
								<xsl:with-param name="name" select="'LitF'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>

							<td>
							<xsl:call-template name="fixed-field-select">	
								<xsl:with-param name="name" select="'Indx'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>

							<td>
							<xsl:call-template name="fixed-field-select">	
								<xsl:with-param name="name" select="'Audn'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>
							    
							<td>
							<xsl:call-template name="fixed-field-text">	
								<xsl:with-param name="name" select="'Contents'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>

							<td>
							<xsl:call-template name="fixed-field-select">	
								<xsl:with-param name="name" select="'GovPub'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>

							<td>
							<xsl:call-template name="fixed-field-select">	
								<xsl:with-param name="name" select="'Fest'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>

							<td>
							<xsl:call-template name="fixed-field-select">	
								<xsl:with-param name="name" select="'Conf'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>
				    
							<td>
							<xsl:call-template name="fixed-field-select">	
								<xsl:with-param name="name" select="'Bio'" />
								<xsl:with-param name="tag" select="$tag008" />
							</xsl:call-template>
							</td>

						</tr>
					</table><!-- specific material format tags -->
						</xsl:if>
			</tr>
		</table>
	</form>
	</xsl:template>
	
	<xsl:template name="fixed-field-select">
		<xsl:param name="name"/>
		<xsl:param name="tag"/>
		<xsl:variable name="position" select="$marc21defs//value[@name=$name]/@position"/>
		<xsl:variable name="length" select="$marc21defs//value[@name=$name]/@length"/>
		<xsl:variable name="value" select="substring($tag, $position+1, $length)"/>
		<!--<p>param name is <xsl:value-of select="$name"/></p>
		<p>Leader value is <xsl:value-of select="$value"/></p>-->
		<xsl:value-of select="$name"/><select>
			<xsl:attribute name="name"><xsl:value-of select="$name"/></xsl:attribute>
			<xsl:attribute name="id"><xsl:value-of select="$name"/></xsl:attribute>
				<xsl:for-each select="$marc21defs//value[@name=$name]/option">
					<xsl:element name="option">
						<xsl:if test="$value=.">
							<xsl:attribute name="selected">selected</xsl:attribute>
						</xsl:if>
						<xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute>
						<xsl:value-of select="."/>
					</xsl:element>
				</xsl:for-each>
		</select>

	</xsl:template>

	<xsl:template name="fixed-field-text">
		<xsl:param name="name"/>
		<xsl:param name="tag"/>
		<xsl:param name="hidden"/>
		<xsl:variable name="position" select="$marc21defs//value[@name=$name]/@position"/>
		<xsl:variable name="length" select="$marc21defs//value[@name=$name]/@length"/>
		<xsl:value-of select="$name"/>
		<input type="text">
			<xsl:attribute name="id"><xsl:value-of select="$name"/></xsl:attribute>
			<xsl:attribute name="size"><xsl:value-of select="$length"/></xsl:attribute>
			<xsl:attribute name="maxlength"><xsl:value-of select="$length"/></xsl:attribute>
			<xsl:attribute name="value">
				<xsl:value-of select="substring($tag, $position+1, $length)"/>
			</xsl:attribute>
			<xsl:if test="$hidden='true'">
				<xsl:attribute name="hidden">true</xsl:attribute>
			</xsl:if>
		</input>
	</xsl:template>
</xsl:stylesheet>
