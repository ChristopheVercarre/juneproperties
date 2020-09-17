# frozen_string_literal: true

module Views
  module Apartments
    class HeaderComponent < ApplicationComponent
      def initialize(apartment: nil)
        @apartment = apartment
      end
    end
  end
end
